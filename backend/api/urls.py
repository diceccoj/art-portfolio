from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostCreate.as_view(), name="post-create"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete"),
    path("posts/modify/<int:pk>/", views.PostModify.as_view(), name="post-modify"),
    path("categories/", views.CategoryCreate.as_view(), name="category-create"),
    path("categories/delete/<int:pk>/", views.CategoryDelete.as_view(), name="category-delete"),
    path("categories/modify/<int:pk>/", views.CategoryModify.as_view(), name="category-modify"),
    path("galleryimages/", views.GalleryImageCreate.as_view(), name="gallery-image-create"),
    path("galleryimages/delete/<int:pk>/", views.GalleryImageDelete.as_view(), name="gallery-image-delete"),
    path("settings/grab/", views.SettingsGrab.as_view(), name="settings-grab"),
    path("settings/modify/<int:pk>/", views.SettingsModify.as_view(), name="settings-modify"),
    path('csrf/', views.csrf, name="csrf"),
    path('ping/', views.ping, name="ping"),
]
