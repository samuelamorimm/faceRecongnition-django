from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django, logout as logout_django
from django.contrib.auth.decorators import login_required
from .models import Cliente

# Create your views here.
def cadastro(request):
    if request.method == 'GET':
        return render(request, 'login/login.html',)
    else:
        if request.method == 'POST':
            username = request.POST.get('email')
            cpf = request.POST.get('cpf')
            email = request.POST.get('email')
            password = request.POST.get('password')

            if len(password) < 8:
                messages.error(request, 'Sua senha tem que conter no minímo 8 caracteres')
                return redirect('login')
            
            
            user = User.objects.filter(email=email)
            if user.exists():
                messages.error(request, 'Já existe um usuário cadastrado com esse E-mail')
                return redirect('login')
            
            user = User.objects.create_user(
                username=username,
                cpf=cpf,
                email=email,
                password=password,
            )
            
            return redirect('login_face')


        

def login(request):
    if request.method == 'GET':
        return render(request, 'login/login.html')
    else:
        if request.method == 'POST':
            username = request.POST['email']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login_django(request, user)
                return redirect('login_face')
            else:
                messages.error(request, 'Usuário ou senha incorretos!')
                return redirect('login')
            
def logout(request):
    logout_django(request)
    return redirect('login')


@login_required
def cliente(request):
    try:
        cliente = Cliente.objects.get(user=request.user)
    except Cliente.DoesNotExist:
        cliente = None

    return render(request, 'login/cliente.html', {"cliente": cliente})
