from django.contrib import admin
from orders.models import Orders

# Register your models here.
@admin.register(Orders)
class OrderAdmin(admin.ModelAdmin):
    list_display= ['table', 'product', 'status', 'created_at']