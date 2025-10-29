# banner/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from putsf_backend.mongo import db
from django.utils import timezone
from bson.objectid import ObjectId
import os

class BannerAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, mongo_id=None):
        """
        GET all banners or a single banner by ID
        """
        banners_collection = db["banners"]

        try:
            if mongo_id:
                banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
                if not banner:
                    return Response({"error": "Banner not found"}, status=status.HTTP_404_NOT_FOUND)
                banner["_id"] = str(banner["_id"])
                return Response(banner)
            else:
                banners = list(banners_collection.find({}).sort("created_at", -1))
                for b in banners:
                    b["_id"] = str(b["_id"])
                return Response(banners)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        POST a new banner
        """
        banners_collection = db["banners"]

        image_file = request.FILES.get("image")
        title = request.data.get("title")

        if not title or not image_file:
            return Response({"error": "Title and image are required"}, status=status.HTTP_400_BAD_REQUEST)

        if banners_collection.find_one({"title": title}):
            return Response({"error": "Banner with this title already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Save file to media/banner
        media_dir = os.path.join(settings.MEDIA_ROOT, "banner")
        os.makedirs(media_dir, exist_ok=True)
        file_path = os.path.join(media_dir, image_file.name)

        try:
            with open(file_path, "wb+") as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
        except Exception as e:
            return Response({"error": f"Failed to save banner image: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        full_url = request.build_absolute_uri(f"/media/banner/{image_file.name}")

        data = {
            "title": title,
            "image_url": full_url,
            "created_at": timezone.now().isoformat()
        }

        result = banners_collection.insert_one(data)
        return Response({"message": "Banner added successfully!", "image_url": full_url, "_id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)

    def delete(self, request, mongo_id):
        """
        DELETE a banner by ID
        """
        banners_collection = db["banners"]

        try:
            banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
            if not banner:
                return Response({"error": "Banner not found"}, status=status.HTTP_404_NOT_FOUND)

            # Delete image file if exists
            image_url = banner.get("image_url")
            if image_url:
                relative_path = image_url.replace(request.build_absolute_uri("/"), "")
                file_path = os.path.join(settings.BASE_DIR, relative_path)
                if os.path.exists(file_path):
                    os.remove(file_path)

            banners_collection.delete_one({"_id": ObjectId(mongo_id)})
            return Response({"message": "Banner deleted successfully!"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
