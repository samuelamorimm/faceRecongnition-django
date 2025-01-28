from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(verbose_name='Nome Completo', max_length=65)
    cpf = models.CharField(verbose_name="CPF", max_length=11)
    email = models.CharField(verbose_name="Email", max_length=100)

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = "Clientes"

    def __str__(self) -> str:
        return self.user.username