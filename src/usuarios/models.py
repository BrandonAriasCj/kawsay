from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    correo_institucional = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    nickname = models.CharField(max_length=50, unique=True)
    biografia = models.TextField(blank=True, null=True)
    usuario_rol = models.CharField(max_length=20, choices=[('alumno', 'Alumno'), ('psicologo', 'Psicólogo'), ('moderador', 'Moderador')])

    def __str__(self):
        return self.nickname

class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    cod_estudiante = models.CharField(max_length=20, unique=True)
    correo_institucional = models.EmailField(unique=True)
    edad = models.IntegerField()
    preferencias = models.ForeignKey('Preferencias', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.nombre

class Psicologo(models.Model):
    id_psicologo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
