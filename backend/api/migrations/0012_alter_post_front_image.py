# Generated by Django 5.0.6 on 2024-07-20 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_galleryimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='front_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/frontimages/'),
        ),
    ]
