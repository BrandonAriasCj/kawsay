from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  # Serializador JWT
from rest_framework_simplejwt.views import TokenObtainPairView  # Vista JWT
from rest_framework.response import Response  # Para respuestas HTTP
from rest_framework.permissions import AllowAny  # Permitir acceso sin autenticación
from usuarios import serializers
from django.utils.timezone import now 
from usuarios.models import TokenRegistro, Usuario  # Tu modelo de usuario
from rest_framework.views import APIView

from usuarios.serializers import UsuarioSerializer  # No se usa en TokenObtainPairView

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        mail_or_nickname = attrs.get('mail') or attrs.get('nickname')  # Permitir ambos
        try:
            usuario = Usuario.objects.get(mail=mail_or_nickname) if '@' in mail_or_nickname else Usuario.objects.get(nickname=mail_or_nickname)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado")

        attrs['username'] = usuario.nickname  # Usar 'nickname' para autenticación interna
        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


    
class RegistroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        datos = request.data
        mail = datos.get('mail')
        password = datos.get('password') 
        nickname = datos.get('nickname')
        token = datos.get('token', None)

        # Validar que los datos requeridos no sean None o vacíos
        if not mail or not password or not nickname:
            return Response({'error': 'Todos los campos son obligatorios'}, status=400)

        if Usuario.objects.filter(mail=mail).exists():
            return Response({'error': 'El correo ya está registrado'}, status=400)

        # Determinar el rol del usuario
        usuario_rol = 'usuario'  # Valor por defecto
        if token:
            token_obj = TokenRegistro.objects.filter(token=token, fecha_expiracion__gte=now()).first()
            if not token_obj:
                return Response({'error': 'Token inválido o expirado'}, status=403)
            usuario_rol = token_obj.usuario_rol  # Asignar el rol del token

        # Crear usuario usando el manager
        usuario = Usuario.objects.create_user(mail=mail, password=password, nickname=nickname, usuario_rol=usuario_rol)

        return Response(UsuarioSerializer(usuario).data, status=201)