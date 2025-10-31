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
        if not phone:
            return Response({"error": "Phone required"}, status=400)

        license_doc = license_collection.find_one({
            "phone": phone,
            "is_approved": True
        })

        if not license_doc:
            return Response({"error": "Not found or not approved"}, status=404)

        # FIX 1: Copy _id → id, DO NOT DELETE
        license_doc["id"] = str(license_doc["_id"])

        # FIX 2: Fix photo URL
        if license_doc.get("photo") and not license_doc["photo"].startswith("http"):
            license_doc["photo"] = request.build_absolute_uri(license_doc["photo"])

        # Render HTML
        html_content = render_to_string("license_template.html", {
            "license": license_doc,
            "request": request  # Pass request for build_absolute_uri
        })

        # Generate PDF with base_url
        base_url = request.build_absolute_uri("/")
        pdf_file = HTML(string=html_content, base_url=base_url).write_pdf()

        # Safe filename
        name = "".join(c for c in license_doc.get("name", "Member") if c.isalnum() or c in " _-")
        response = HttpResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="PUTSF_{name}.pdf"'
        return response

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)