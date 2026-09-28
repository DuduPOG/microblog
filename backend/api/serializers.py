from rest_framework import serializers
from .models import Usuario, Publicacao, Comentario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class LoginSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].required = False
        self.fields['senha'] = serializers.CharField(write_only=True, required=False)

    def validate(self, attrs):
        password = attrs.get('password')
        if password is None:
            password = attrs.get('senha')
        if password is None:
            raise serializers.ValidationError({
                'password': 'Informe password ou senha.'
            })

        attrs['password'] = password
        attrs.pop('senha', None)
        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['nome'] = user.nome
        token['email'] = user.email
        token['admin'] = user.is_superuser

        return token


class UsuarioSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Usuario
        fields = ('id', 'username', 'nome', 'senha', 'password')

    def validate(self, attrs):
        password = attrs.pop('password', None)
        senha = attrs.get('senha')

        if senha is not None and password is not None and senha != password:
            raise serializers.ValidationError({
                'password': 'Os campos senha e password devem ter o mesmo valor.'
            })
        if senha is None:
            senha = password
        if senha is None:
            raise serializers.ValidationError({
                'password': 'Informe password ou senha.'
            })

        attrs['senha'] = senha
        return attrs

    def create(self, validated_data):
        senha = validated_data.pop('senha')
        usuario = Usuario.objects.create_user(password=senha, **validated_data)
        return usuario


class PublicacaoSerializer(serializers.ModelSerializer):
    autor = UsuarioSerializer(read_only=True)
    publicado_em = serializers.CharField(read_only=True)
    imagem = serializers.ImageField(required=False)

    class Meta:
        model = Publicacao
        fields = ['id', 'titulo', 'imagem', 'descricao',
                  'autor', 'publicado_em']


class ComentarioSerializer(serializers.ModelSerializer):
    autor = UsuarioSerializer(read_only=True)
    publicado_em = serializers.CharField(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'autor',
                  'publicacao', 'mensagem', 'publicado_em']
