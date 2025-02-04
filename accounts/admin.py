from django.contrib import admin
from .models import *
# Register your models here.

class UserAccessAdmin(admin.ModelAdmin):
    list_display = ('user', 'data_acesso')

admin.site.register(UserImages)
admin.site.register(UserAccess, UserAccessAdmin)
