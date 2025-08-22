from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from datetime import timedelta
from django.utils import timezone

def inicio(request):
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login') 

def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        remember_me = request.POST.get("remember")  # Get remember me checkbox value

        # Buscar usuario por email
        from django.contrib.auth.models import User
        try:
            username = User.objects.get(email=email).username
        except User.DoesNotExist:
            return render(request, "login.html", {"error": "Usuario no encontrado"})

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            
            # Handle "remember me" functionality
            if remember_me:
                # Set session to expire in 30 days
                request.session.set_expiry(30 * 24 * 60 * 60)  # 30 days in seconds
            else:
                # Set session to expire when browser closes (default behavior)
                request.session.set_expiry(0)

            # Redirección según grupo
            if user.groups.filter(name="Admin").exists():
                return redirect("admin_page")
            elif user.groups.filter(name="Manager").exists():
                return redirect("manager-page")
            else:
                return render(request, "login.html", {"error": "No tienes permisos asignados"})
        else:
            return render(request, "login.html", {"error": "Credenciales incorrectas"})

    return render(request, "login.html")

@login_required
def admin_page(request):
    return render(request, "admin_inicio.html")

@login_required
def manager_page(request):
    return render(request, "manager_inicio.html")