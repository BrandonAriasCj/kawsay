from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat_view, name='chat'),
    path('send/', views.chat_send, name='chat_send'),
]
