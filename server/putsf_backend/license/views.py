from urllib.parse import quote
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from bson import ObjectId
from putsf_backend.settings import get_db
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os


# =========================================
# MongoDB Collection
# =========================================
mongo_db = get_db()
license_collection = mongo_db["licenses"] if mongo_db is not None else None


# =========================================
# ViewSet (Using MongoDB)
# =========================================
class LicenseViewSet(viewsets.ViewSet):
    """
    Custom ViewSet to use MongoDB directly instead of Django ORM
    """
    http_method_names = ['get', 'post', 'delete']

    def list(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=500)
        data = list(license_collection.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return Response(data)

    def create(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=500)

        data = request.data.dict() if hasattr(request.data, "dict") else dict(request.data)
        photo = request.FILES.get("photo")

        photo_path = None
        if photo:
            from django.core.files.storage import default_storage
            photo_path = default_storage.save(f"licenses/photos/{photo.name}", photo)

        license_doc = {
            "name": data.get("name"),
            "aadhar_number": data.get("aadhar_number"),
            "phone": data.get("phone"),
            "address": data.get("address"),
            "photo": request.build_absolute_uri(f"/media/{photo_path}") if photo_path else None,
            "is_approved": False,
        }

        result = license_collection.insert_one(license_doc)
        license_doc["_id"] = str(result.inserted_id)
        return Response(license_doc, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=500)
        license_collection.delete_one({"_id": ObjectId(pk)})
        return Response({"message": "License deleted"}, status=204)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=500)

        license_doc = license_collection.find_one({"_id": ObjectId(pk)})
        if not license_doc:
            return Response({"error": "License not found"}, status=404)

        license_collection.update_one({"_id": ObjectId(pk)}, {"$set": {"is_approved": True}})

        # ✅ WhatsApp message content
        name = license_doc.get("name", "")
        phone = license_doc.get("phone", "")
        download_link = "https://your-frontend-domain.com/membership-download"
        message = (
            f"🎉 Hello {name}!\n\n"
            f"Your membership license has been approved ✅.\n"
            f"You can now download it from the following link:\n"
            f"{download_link}"
        )

        # ✅ Generate WhatsApp Click-to-Chat link
        encoded_message = quote(message)
        whatsapp_link = f"https://wa.me/91{phone}?text={encoded_message}"

        return Response({
            "message": "License approved successfully!",
            "whatsapp_link": whatsapp_link
        })


# =========================================
# License Download API
# =========================================
@api_view(["GET"])
def download_license(request):
    try:
        phone = request.GET.get("phone")
        print("📞 Received phone:", phone)

        if license_collection is None:
            print("❌ MongoDB not connected")
            return Response(
                {"error": "MongoDB not connected"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # 🔍 Fetch license by phone
        license_doc = license_collection.find_one({"phone": phone, "is_approved": True})
        print("🔍 License found:", license_doc)

        if not license_doc:
            return Response(
                {"error": "License not found or not approved"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # ✅ Safely convert Mongo ObjectId to string and rename to avoid template underscore issue
        license_doc["id"] = str(license_doc["_id"])
        del license_doc["_id"]

        # ✅ Render the HTML template
        html_content = render_to_string("license_template.html", {"license": license_doc})
        print("🧾 HTML rendered successfully")

        # ✅ Generate PDF
        pdf = HTML(string=html_content).write_pdf()
        print("📄 PDF generated successfully")

        # ✅ Send PDF as downloadable response
        response = HttpResponse(pdf, content_type="application/pdf")
        response["Content-Disposition"] = f"attachment; filename=license_{license_doc['name']}.pdf"
        print("✅ Response ready")

        return response

    except Exception as e:
        import traceback
        print("❗ Exception occurred:", e)
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
