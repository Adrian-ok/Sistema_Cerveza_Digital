from django.db import models

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=100)
    active = models.BooleanField(default=False)
    image = models.ImageField(upload_to='categories')

    def __str__(self):
        return self.title