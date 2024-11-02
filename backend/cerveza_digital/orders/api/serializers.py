from rest_framework.serializers import ModelSerializer

from products.api.serializers import ProductSerializer
from tables.api.serializers import TableSerializer
from orders.models import Orders

class OrderSerializer(ModelSerializer):
    product_data = ProductSerializer(source='product', read_only=True)
    table_data = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Orders
        fields = ['id', 'status', 'table', 'table_data', 'product', 'product_data', 'payment', 'close', 'created_at']