# Funcion para autenticar un usuario con Django Auth
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Empleado, Sucursal, Horario

def autenticar_usuario(request, email, password):
    try:
        user_obj = User.objects.get(email=email)
        user = authenticate(request, username=user_obj.username, password=password)
        return user
    except User.DoesNotExist:
        return None

def crear_empleado(data):
    sucursal = Sucursal.objects.get(pk=data.get("sucursal_id"))
    horario = Horario.objects.get(pk=data.get("horario_id"))