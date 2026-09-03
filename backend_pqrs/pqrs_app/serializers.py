from rest_framework import serializers
from .models import TicketPQRS

class TicketPQRSSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketPQRS
        fields = ['codigo', 'nombre', 'correo', 'categoria', 'asunto', 'descripcion', 'estado', 'fecha_creacion']
        read_only_fields = ['codigo', 'estado', 'fecha_creacion']