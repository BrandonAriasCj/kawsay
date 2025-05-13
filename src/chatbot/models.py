from django.db import models
from usuarios.models import Usuario

class InteraccionIA(models.Model):
    id_interaccion = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_interaccion = models.DateTimeField(auto_now_add=True)
    prompt_usuario = models.TextField()
    respuesta_ia = models.TextField()

    def __str__(self):
        return f"Interacción de {self.usuario.nickname} - {self.fecha_interaccion}"

class UsuarioHasIntereses(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    interes_detectado = models.CharField(max_length=255)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    confirmado = models.BooleanField(default=False)  # Se confirma después de análisis

    def __str__(self):
        status = "Confirmado" if self.confirmado else "Provisional"
        return f"{self.usuario.nickname} - {self.interes_detectado} ({status})"

class ContextoHistoria(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    contexto_general = models.TextField()  # Resumen de la historia en curso
    personajes = models.JSONField(default=dict)  # Lista de personajes con atributos
    escenarios = models.JSONField(default=dict)  # Lugares y ambientaciones
    eventos_clave = models.JSONField(default=dict)  # Momentos importantes de la historia
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contexto de {self.usuario.nickname}"
