from rest_framework import viewsets
from .models import Usuario, Alumno, Psicologo, Preferencias, HistorialPreferencias
from .serializers import UsuarioSerializer, AlumnoSerializer, PsicologoSerializer, PreferenciasSerializer, HistorialPreferenciasSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer

class PsicologoViewSet(viewsets.ModelViewSet):
    queryset = Psicologo.objects.all()
    serializer_class = PsicologoSerializer

class PreferenciasViewSet(viewsets.ModelViewSet):
    queryset = Preferencias.objects.all()
    serializer_class = PreferenciasSerializer

class HistorialPreferenciasViewSet(viewsets.ModelViewSet):
    queryset = HistorialPreferencias.objects.all()
    serializer_class = HistorialPreferenciasSerializer
