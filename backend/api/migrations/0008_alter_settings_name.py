# Generated by Django 5.0.6 on 2024-07-12 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_settings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settings',
            name='name',
            field=models.CharField(max_length=50, verbose_name='Name'),
        ),
    ]
