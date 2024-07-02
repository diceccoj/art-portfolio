from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostCreate.as_view(), name="post-create"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete"),
    
]
