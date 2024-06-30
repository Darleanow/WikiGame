from django.urls import path
from . import views

urlpatterns = [
    path('fetch_article', views.fetch_article, name='fetch_article'),
    path('get_random_articles', views.get_random_articles, name='get_random_articles'),
]
