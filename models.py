from django.db import models

class Slot(models.Model):
    number = models.PositiveIntegerField()
    amount = models.PositiveIntegerField()
    save_name = models.CharField(max_length=100)
