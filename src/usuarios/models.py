from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    correo_institucional = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    nickname = models.CharField(max_length=50, unique=True)
    biografia = models.TextField(blank=True, null=True)
    usuario_rol = models.CharField(max_length=20, choices=[
        ('alumno', 'Alumno'),
        ('psicologo', 'Psicólogo'),
        ('moderador', 'Moderador')
    ])

    def __str__(self):
        return self.nickname

class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    cod_estudiante = models.CharField(max_length=20, unique=True)
    edad = models.IntegerField()

    def __str__(self):
        return self.nombre

class Psicologo(models.Model):
    id_psicologo = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    correo_institucional = models.EmailField(unique=True)

    def __str__(self):
        return self.nombre

class Preferencias(models.Model):
    id_preferencias = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha_confirmacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Preferencias de {self.usuario.nickname}"

class HistorialPreferencias(models.Model):
    id_historial = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha_registro = models.DateTimeField(auto_now_add=True)
    confirmado = models.BooleanField(default=False)

    def __str__(self):
        status = "Confirmado" if self.confirmado else "Provisional"
        return f"Historial de {self.usuario.nickname} ({status})"
