from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, get_object_or_404, redirect
from .models import TicketPQRS, TicketLog
from .serializers import TicketPQRSSerializer

# ==========================================
# 1. API ENDPOINTS (Para comunicarse con Next.js)
# ==========================================

@api_view(['POST'])
def radicar_ticket(request):
    """Recibe los datos del frontend, los valida y crea el ticket."""
    serializer = TicketPQRSSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'codigo': serializer.data['codigo'], 'mensaje': 'Ticket creado exitosamente.'}, 
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def consultar_ticket(request, codigo):
    """Busca un ticket por su código y lo envía al frontend."""
    try:
        ticket = TicketPQRS.objects.get(codigo=codigo)
        serializer = TicketPQRSSerializer(ticket)
        return Response(serializer.data)
    except TicketPQRS.DoesNotExist:
        return Response({'error': 'Ticket no encontrado.'}, status=status.HTTP_404_NOT_FOUND)


# ==========================================
# 2. PANEL ADMINISTRATIVO MVT (Para uso interno)
# ==========================================

def listar_tickets(request):
    tickets = TicketPQRS.objects.all().order_by('-fecha_creacion')
    return render(request, 'pqrs/listar_tickets.html', {'tickets': tickets})

def detalle_ticket(request, codigo):
    ticket = get_object_or_404(TicketPQRS, codigo=codigo)
    
    if request.method == 'POST':
        nuevo_estado = request.POST.get('estado')
        nota = request.POST.get('nota')
        
        if nuevo_estado and nuevo_estado != ticket.estado:
            ticket.estado = nuevo_estado
            ticket.save()
            
        if nota:
            # Nota: request.user requiere que el usuario esté logueado. 
            # Por ahora puede ser null porque no hay sistema de login configurado.
            autor = request.user if request.user.is_authenticated else None
            TicketLog.objects.create(ticket=ticket, autor=autor, nota=nota)
            
        return redirect('detalle_ticket', codigo=codigo)
        
    return render(request, 'pqrs/detalle_ticket.html', {'ticket': ticket})