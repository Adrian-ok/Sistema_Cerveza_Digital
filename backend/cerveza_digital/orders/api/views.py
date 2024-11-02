from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from orders.api.serializers import OrderSerializer
from orders.models import Orders

class OrderApiViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['table', 'status', 'payment', 'close']
    ordering_fields = '__all__'
