from django.db import models
from django.contrib.auth.models import User


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
    front_image = models.ImageField(null=True, blank=True, upload_to="images/")
    likes = models.IntegerField('Likes', blank=False, default=0)
    colour_scheme = models.CharField('Colour Scheme', max_length=20, default="blue")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title



'''
    Any other picture to be referenced in a post after a user clicks on it
'''
class GalleryImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(null=False, blank=True, upload_to="images/" + str(post))
    

