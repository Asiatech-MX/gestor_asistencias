from django.contrib import admin
from django.urls import path
from core import views  # importa la vista

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.inicio, name='inicio'),  # <-- ruta raíz
    path('login/', views.login_view, name='login'),
    path("logout/", views.logout_view, name="logout"),
    path("admin-page/", views.admin_page, name="admin_page"),
    path("manager-page/", views.manager_page, name="manager-page"),
]
