from rest_framework import viewsets
from rest_framework.permissions import AllowAny  # ✅ allow public access
from .models import Complaint
from .serializers import ComplaintSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]  # ✅ anyone can post complaint
