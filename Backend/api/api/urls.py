"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views
from django.contrib.sitemaps import views as sitemap_views
from django.contrib.sitemaps import Sitemap
from app.sitemaps import BlogPostSitemap
from Backend.app.viwes import app

sitemaps = {
    'blog': BlogPostSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls, app=app),
    path('', views.index, name='index', app=app),  # Example view from views.py
    path('sitemap.xml', sitemap_views.sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap', app=app),
    path('post/<slug:slug>/', views.post_detail, name='post_detail', app=app),
]
