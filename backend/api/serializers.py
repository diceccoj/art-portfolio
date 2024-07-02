from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, GalleryImage, Category


#The user who can log in and post content. There exists only one user who is premade
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "description", "created_at", "front_image", "likes", "colour_scheme", "category"]
        extra_kwargs = {"created_at": {"read_only": True}}


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "post", "image"]
        extra_kwargs = {}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category_name"]
        extra_kwargs = {"category_name": {"read_only": True}}