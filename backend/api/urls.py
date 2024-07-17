from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostCreate.as_view(), name="post-create"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete"),
    path("settings/grab/", views.SettingsGrab.as_view(), name="settings-grab"),
    path("settings/modify/<int:pk>/", views.SettingsModify.as_view(), name="settings-modify"),
    path('csrf/', views.csrf, name="csrf"),
    path('ping/', views.ping, name="ping"),
]
