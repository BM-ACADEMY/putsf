from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from putsf_backend.mongo import db
from django.utils import timezone
from bson.objectid import ObjectId
import os

class GalleryImageAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, mongo_id=None):
        """
        GET all images or a single image by ID
        """
        images_collection = db["gallery_images"]
        try:
            if mongo_id:
                try:
                    image = images_collection.find_one({"_id": ObjectId(mongo_id)})
                except Exception:
                    return Response({"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST)

                if not image:
                    return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)
                
                image["_id"] = str(image["_id"])
                return Response(image, status=status.HTTP_200_OK)

            else:
                images = list(images_collection.find({}).sort("created_at", -1))
                for img in images:
                    img["_id"] = str(img["_id"])
                    # Optional: ensure 'created_at' exists
                    if "created_at" not in img:
                        img["created_at"] = None
                return Response(images, status=status.HTTP_200_OK)

        except Exception as e:
            print("Gallery GET error:", str(e))
            return Response({"error": "Failed to fetch images"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """
        POST a new image with title
        """
        images_collection = db["gallery_images"]

        image_file = request.FILES.get("image")
        title = request.data.get("title")

        if not image_file or not title:
            return Response({"error": "Title and image are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check for duplicate title
        if images_collection.find_one({"title": title}):
            return Response({"error": "Image with this title already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Save file to media/gallery
        media_dir = os.path.join(settings.MEDIA_ROOT, "gallery")
        os.makedirs(media_dir, exist_ok=True)
        file_path = os.path.join(media_dir, image_file.name)

        try:
            with open(file_path, "wb+") as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
        except Exception as e:
            print("POST file save error:", str(e))
            return Response({"error": f"Failed to save file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Build absolute URL
        full_url = f"{settings.SITE_DOMAIN}/media/gallery/{image_file.name}"

        # Insert into MongoDB
        data = {
            "title": title,
            "image_url": full_url,
            "created_at": timezone.now().isoformat()
        }
        try:
            result = images_collection.insert_one(data)
        except Exception as e:
            print("POST MongoDB insert error:", str(e))
            return Response({"error": "Failed to save image metadata"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(
            {
                "message": "Image added successfully!",
                "_id": str(result.inserted_id),
                "image_url": full_url
            },
            status=status.HTTP_201_CREATED
        )

    def delete(self, request, mongo_id):
        """
        DELETE an image by ID
        """
        images_collection = db["gallery_images"]

        try:
            try:
                image = images_collection.find_one({"_id": ObjectId(mongo_id)})
            except Exception:
                return Response({"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST)

            if not image:
                return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

            # Delete file from media
            image_url = image.get("image_url")
            if image_url:
                filename = os.path.basename(image_url)
                file_path = os.path.join(settings.MEDIA_ROOT, "gallery", filename)
                if os.path.exists(file_path):
                    os.remove(file_path)

            # Delete from MongoDB
            images_collection.delete_one({"_id": ObjectId(mongo_id)})

            return Response({"message": "Image deleted successfully!"}, status=status.HTTP_200_OK)

        except Exception as e:
            print("DELETE error:", str(e))
            return Response({"error": "Failed to delete image"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
