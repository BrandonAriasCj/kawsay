from rest_framework import serializers
from .models import Usuario, Alumno, Psicologo, Preferencias, HistorialPreferencias

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'

class PsicologoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Psicologo
        fields = '__all__'

class PreferenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencias
        fields = '__all__'

class HistorialPreferenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialPreferencias
        fields = '__all__'
