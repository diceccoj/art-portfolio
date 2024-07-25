from django.http import JsonResponse
from rest_framework import generics
from .serializers import PostSerializer, GalleryImageSerializer, CategorySerializer, SettingsSerializer, AvatarSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Category, GalleryImage, Settings, Avatar
from django.middleware.csrf import get_token
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

#for getting the csrf token


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

# for grabbing categories without authentication
class CategoryGrabUnauth(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

    def get_queryset(self):
        return Category.objects

class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Category.objects

class CategoryModify(generics.UpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.is_valid():
            super().perform_update(serializer)
        else:
            print(serializer.errors)

    def get_queryset(self):
        return Category.objects


class PostCreate(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'category']

    def get_queryset(self):
        return Post.objects

    def create(self, request, *args, **kwargs):
        #category id is passed as a string, converting it to category object
        category_id = request.data.get('category')
        if (category_id != ''): request.data['category'] = int(category_id)
        else: request.data['category'] = None

        
        

        serializer = self.get_serializer(data=request.data)
        if (serializer.is_valid()):
            self.perform_create(serializer=serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

# for unauthorized post grabbing (latest first)
class PostGrabUnauth(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'category']

    def get_queryset(self):
        return Post.objects.all().order_by('-created_at')

# only returns the latest 3 posts (usually in its category)

class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects
    
class PostModify(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.is_valid():
            super().perform_update(serializer)
        else:
            print(serializer.errors)

    def get_queryset(self):
        return Post.objects


class GalleryImageCreate(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GalleryImage.objects

    def create(self, request, *args, **kwargs):
        #post id is passed as a string, converting it to post object
        post_id = request.data.get('post')
        if (post_id != ''): request.data['post'] = int(post_id)
        else: return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if (serializer.is_valid()):
            self.perform_create(serializer=serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

# grabbing gallery images without authentication
class GalleryImageGrabUnauth(generics.ListAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post']

    def get_queryset(self):
        return GalleryImage.objects

class GalleryImageDelete(generics.DestroyAPIView):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticated]

    
    def get_queryset(self):
        return GalleryImage.objects
    

class SettingsGrab(generics.ListAPIView):
    serializer_class = SettingsSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

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

class AvatarGrab(generics.ListAPIView):
    serializer_class = AvatarSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Avatar.objects


class AvatarModify(generics.UpdateAPIView):
    serializer_class = AvatarSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if serializer.is_valid():
            super().perform_update(serializer)
        else:
            print(serializer.errors)

    def get_queryset(self):
        return Avatar.objects
