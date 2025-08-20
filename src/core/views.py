from django.shortcuts import render, redirect
from django.contrib.auth import  login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .services import autenticar_usuario
from django.contrib import messages
from .models import Sucursal, Horario

def inicio(request):
    return render(request, 'login.html')
def logout_view(request):
    logout(request)
    return redirect('login') 

def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = autenticar_usuario(request, email, password)

        if user is not None:
            login(request, user)

             # Redirección según grupo
            if user.groups.filter(name="Admin").exists():
                return redirect("admin_page")
            elif user.groups.filter(name="Manager").exists():
                return redirect("manager-page")
            else:
                messages.error(request, "No tienes permisos para ingresar.")
        else:
            messages.error(request, "Correo o contraseña incorrectos.")
        return redirect("login")
    
    return render(request, "login.html")



@login_required
def admin_page(request):
    return render(request, "admin_inicio.html")
@login_required
def manager_page(request):
    return render(request, "manager_inicio.html")
@login_required
def gestion_empleados(request):
    sucursales = Sucursal.objects.all()
    horarios = Horario.objects.all()
    return render(request, "gestion_empleados.html", {
        "sucursales": sucursales,
        "horarios": horarios,
    })
