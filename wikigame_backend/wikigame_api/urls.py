from django.urls import path
from . import views

urlpatterns = [
    path('get_random_article', views.get_random_article, name='get_random_article'),
    path('fetch_article', views.fetch_article, name='fetch_article'),
    path('get_random_articles', views.get_random_articles, name='get_random_articles'),
]
