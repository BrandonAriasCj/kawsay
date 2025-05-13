from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, AlumnoViewSet, PsicologoViewSet, PreferenciasViewSet, HistorialPreferenciasViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'alumnos', AlumnoViewSet)
router.register(r'psicologos', PsicologoViewSet)
router.register(r'preferencias', PreferenciasViewSet)
router.register(r'historial-preferencias', HistorialPreferenciasViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
