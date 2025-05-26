from django.contrib import admin
from .models import TokenRegistro
import secrets
from django.utils.timezone import now, timedelta

@admin.action(description="Generar token para moderador")
def generar_token_moderador(modeladmin, request, queryset):
    token = secrets.token_hex(16)
    TokenRegistro.objects.create(token=token, usuario_rol='moderador', fecha_expiracion=now() + timedelta(hours=24))
    modeladmin.message_user(request, f"Token generado: {token}")

@admin.action(description="Generar token para psicólogo")
def generar_token_psicologo(modeladmin, request, queryset):
    token = secrets.token_hex(16)
    TokenRegistro.objects.create(token=token, usuario_rol='psicologo', fecha_expiracion=now() + timedelta(hours=24))
    modeladmin.message_user(request, f"Token generado: {token}")

class TokenRegistroAdmin(admin.ModelAdmin):
    list_display = ('token', 'usuario_rol', 'fecha_expiracion')
    actions = [generar_token_moderador, generar_token_psicologo]

admin.site.register(TokenRegistro, TokenRegistroAdmin)