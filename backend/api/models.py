from django.db import models
import sys
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


'''
    Categories to organize different posts
'''
class Category(models.Model):
    category_name = models.CharField('Category Name', max_length=50)



'''
    The main post to show on the frontpage, displaying a title and main image
'''
class Post(models.Model):
    title = models.CharField('Title', max_length=50)
    description = models.TextField("Description")
    created_at = models.DateTimeField(auto_now_add=True)
    front_image = models.ImageField(null=True, blank=True, upload_to="images/frontimages/")
    colour_scheme = models.CharField('Colour Scheme', max_length=20, default="sunset")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.front_image = self.compressImage(self.front_image)
        super(Post, self).save(*args, **kwargs)

    # compress image before uploading
    def compressImage(self,uploadedImage):
        imt = Image.open(uploadedImage)
        outputIoStream = BytesIO()
        imt_resized = imt.resize( (int(imt.width*0.7),int(imt.height*0.7)) ) 
        rgb_imt = imt_resized.convert('RGB')
        rgb_imt.save(outputIoStream , format='JPEG', quality=70)
        outputIoStream.seek(0)
        uploadedImage = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.jpg" % uploadedImage.name.split('.')[0], 'image/jpeg', sys.getsizeof(outputIoStream), None)
        return uploadedImage



'''
    Any other picture to be referenced in a post after a user clicks on it
'''
class GalleryImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    image = models.ImageField(null=False, blank=True, upload_to="images/" + str(post) + "/")

    def save(self, *args, **kwargs):
        if not self.id:
            self.image = self.compressImage(self.image)
        super(GalleryImage, self).save(*args, **kwargs)

    # compress image before uploading
    def compressImage(self,uploadedImage):
        imt = Image.open(uploadedImage)
        outputIoStream = BytesIO()
        imt_resized = imt.resize( (int(imt.width*0.7),int(imt.height*0.7)) ) 
        rgb_imt = imt_resized.convert('RGB')
        rgb_imt.save(outputIoStream , format='JPEG', quality=70)
        outputIoStream.seek(0)
        uploadedImage = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.jpg" % uploadedImage.name.split('.')[0], 'image/jpeg', sys.getsizeof(outputIoStream), None)
        return uploadedImage

    
    
'''
    Site-wide settings. Editable by admin only
'''
class Settings(models.Model):
    name = models.CharField("Name", max_length=50)
    value = models.CharField("Value", max_length=500, null=True)
    def __str__(self):
        return self.name
    
'''
    The Avatar
'''
class Avatar(models.Model):
    avatar = models.ImageField(null=True, blank=True, upload_to="images/settings/")
