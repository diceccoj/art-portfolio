from django.contrib import admin
from . import models

admin.site.register(models.Category)
admin.site.register(models.Post)
admin.site.register(models.GalleryImage)
admin.site.register(models.Settings)
admin.site.register(models.Avatar)
