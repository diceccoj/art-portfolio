from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, GalleryImage, Category, Settings


#The user who can log in and post content. There exists only one user who is premade
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

class PostSerializer(serializers.ModelSerializer):
    front_image = serializers.ImageField(required=False)
    class Meta:
        model = Post
        fields = ["id", "title", "description", "created_at", "front_image", "likes", "colour_scheme", "category"]


class GalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = GalleryImage
        fields = ["id", "post", "image"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name"]

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ["id", "name", "value"]
        