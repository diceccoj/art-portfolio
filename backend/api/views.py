from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import generics
from .serializers import PostSerializer, GalleryImageSerializer, CategorySerializer, SettingsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Category, GalleryImage, Settings
from django.middleware.csrf import get_token
from rest_framework.decorators import permission_classes, api_view

#for getting the csrf token

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    return JsonResponse({'result': 'OK'})

class CategoryCreate(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Category.objects

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Category.objects



class PostCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects


class GalleryImageCreate(generics.ListCreateAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GalleryImage.objects

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class GalleryImageDelete(generics.DestroyAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]

    
    def get_queryset(self):
        return GalleryImage.objects
    

class SettingsGrab(generics.ListAPIView):
    serializer_class = SettingsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Settings.objects


class SettingsModify(generics.UpdateAPIView):
    serializer_class = SettingsSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.is_valid():
            super().perform_update(serializer)
        else:
            print(serializer.errors)

    def get_queryset(self):
        return Settings.objects
