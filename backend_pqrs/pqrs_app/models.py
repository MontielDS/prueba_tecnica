from django.db import models
from django.contrib.auth.models import User
import uuid

class TicketPQRS(models.Model):
    ESTADOS = (
        ('Nuevo', 'Nuevo'),
        ('En Revisión', 'En Revisión'),
        ('Resuelto', 'Resuelto'),
        ('Cerrado', 'Cerrado'),
    )
    
    codigo = models.CharField(max_length=15, unique=True, blank=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField()
    categoria = models.CharField(max_length=50)
    asunto = models.CharField(max_length=200)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Nuevo')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = f"PQRS-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.codigo} - {self.asunto}"

class TicketLog(models.Model):
    ticket = models.ForeignKey(TicketPQRS, on_delete=models.CASCADE, related_name='logs')
    fecha = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nota = models.TextField()