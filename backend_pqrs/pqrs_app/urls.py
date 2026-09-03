from django.urls import path
from . import views

urlpatterns = [
    path('api/radicar/', views.radicar_ticket, name='api_radicar'),
    path('api/consultar/<str:codigo>/', views.consultar_ticket, name='api_consultar'),
    
    path('panel/', views.listar_tickets, name='listar_tickets'),
    path('panel/ticket/<str:codigo>/', views.detalle_ticket, name='detalle_ticket'),
]