# Funcion para autenticar un usuario con Django Auth
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Empleado, AsignacionHorario, Sucursal, Horario

def autenticar_usuario(request, email, password):
    try:
        user_obj = User.objects.get(email=email)
        user = authenticate(request, username=user_obj.username, password=password)
        return user
    except User.DoesNotExist:
        return None

def crear_empleado_service(data):
    # 1. Crear empleado
    empleado = Empleado.objects.create(
        codigo_frappe=data.get("codigoFrappe"),
        codigo_checador=data.get("codigoChecador"),
        nombre=data.get("nombre"),
        apellido_paterno=data.get("primerApellido"),
        apellido_materno=data.get("segundoApellido"),
        email=data.get("email"),
        tiene_horario_asignado=True
    )

    # 2. Crear asignación (si existen sucursal y horario)
    sucursal_id = data.get("sucursal")
    horario_id = data.get("horario")

    if sucursal_id and horario_id:
        sucursal = Sucursal.objects.get(pk=int(sucursal_id))
        horario = Horario.objects.get(pk=int(horario_id)) 

        # 2. Crear asignación con datos extra del horario
        AsignacionHorario.objects.create(
            empleado=empleado,
            sucursal=sucursal,
            horario=horario,
            es_primera_quincena=True,
            hora_entrada_especifica=horario.hora_entrada,
            hora_salida_especifica=horario.hora_salida, 
            hora_salida_especifica_cruza_medianoche=horario.cruza_medianoche
        )
    return empleado