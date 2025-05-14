from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.timezone import now, timedelta

class UsuarioManager(BaseUserManager):
    def create_user(self, mail, password, nickname, usuario_rol='usuario'):
        if not mail:
            raise ValueError("El usuario debe tener un correo")
        usuario = self.model(
            mail=self.normalize_email(mail),
            nickname=nickname,
            usuario_rol=usuario_rol  # Agregar usuario_rol
        )
        usuario.set_password(password)  # Encripta la contraseña
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, mail, password, nickname):
        usuario = self.create_user(mail, password, nickname, usuario_rol="admin")
        usuario.is_admin = True
        usuario.save(using=self._db)
        return usuario


class Usuario(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    mail = models.EmailField(unique=True)
    nickname = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)  # Se encripta con set_password
    usuario_rol = models.CharField(
        max_length=20,
        choices=[
            ('usuario', 'Usuario'),
            ('moderador', 'Moderador'),
            ('psicologo', 'Psicólogo'),
            ('admin', 'Administrador')
        ],
        default='usuario'  # Asignar "usuario" por defecto
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UsuarioManager()  # Asegurar que el manager esté asignado

    USERNAME_FIELD = 'mail'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return self.nickname

    @property
    def is_staff(self):
        return self.is_admin


    @property
    def is_staff(self):
        return self.is_admin



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



class TokenRegistro(models.Model):
    token = models.CharField(max_length=50, unique=True)
    usuario_rol = models.CharField(max_length=20, choices=[('moderador', 'Moderador'), ('psicologo', 'Psicólogo')])
    fecha_expiracion = models.DateTimeField(default= timedelta(hours=24))



    def __str__(self):
        return f"{self.token} - {self.usuario_rol}"
    

