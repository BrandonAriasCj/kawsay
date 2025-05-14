from django.core.management.base import BaseCommand
import secrets
from django.utils.timezone import now, timedelta
from usuarios.models import TokenRegistro

class Command(BaseCommand):
    help = "Generar un token de registro para moderador o psicólogo"

    def add_arguments(self, parser):
        parser.add_argument('usuario_rol', type=str, choices=['moderador', 'psicologo'], help="Rol del usuario")
        parser.add_argument('--expiracion', type=int, default=24, help="Horas antes de que el token expire")

    def handle(self, *args, **kwargs):
        usuario_rol = kwargs['usuario_rol']
        horas_expiracion = kwargs['expiracion']

        # Generar un token único
        token = secrets.token_hex(16)

        # Verificar si el token ya existe
        while TokenRegistro.objects.filter(token=token).exists():
            token = secrets.token_hex(16)

        # Crear el token con la expiración configurada
        fecha_expiracion = now() + timedelta(hours=horas_expiracion)
        TokenRegistro.objects.create(token=token, usuario_rol=usuario_rol, fecha_expiracion=fecha_expiracion)

        self.stdout.write(self.style.SUCCESS(f"Token generado para {usuario_rol}: {token} (Expira en {horas_expiracion} horas)"))


#python manage.py generar_token moderador
#python manage.py generar_token psicologo
