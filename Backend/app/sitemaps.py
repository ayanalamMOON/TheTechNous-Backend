from django.contrib.sitemaps import Sitemap
from Backend.api.api.models import BlogPost

class BlogPostSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.8

    def items(self):
        return BlogPost.objects.all()

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        return obj.get_absolute_url()
