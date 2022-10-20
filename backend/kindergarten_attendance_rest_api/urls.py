from posixpath import basename
from rest_framework import routers, viewsets
from django.urls import path, include
from . import views
from .models import *
from .serializer import *
from .views import *

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'class', ClassViewSet)
router.register(r'attendance',
                AttendanceDataViewSet)
router.register(r'child',
                ChildViewSet)
router.register(r'teacher',
                TeacherViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
