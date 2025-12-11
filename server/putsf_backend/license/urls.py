from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PUTSFViewSet

router = DefaultRouter()
router.register(r"putsf", PUTSFViewSet, basename="putsf")

urlpatterns = [
    path("", include(router.urls)),

    # Extra API endpoints
    path("putsf/check_phone/", PUTSFViewSet.as_view({"get": "check_phone"})),
    path("putsf/download/", PUTSFViewSet.as_view({"get": "download"})),
]
