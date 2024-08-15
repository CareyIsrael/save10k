from django.urls import path
from .views import save_slots, load_slots

urlpatterns = [
    path('save-slots/', save_slots, name='save_slots'),
    path('load-slots/', load_slots, name='load_slots'),
]
