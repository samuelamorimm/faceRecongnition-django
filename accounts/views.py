from django.shortcuts import render
import base64
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
from .models import *
import face_recognition
from django.utils import timezone
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def dashboard(request):

  hoje = timezone.now().date()
  atual = timezone.now()

  context = {
    'acessos': UserAccess.objects.all(),
    'faces': UserImages.objects.all().count(),
    'acessos_hoje': UserAccess.objects.filter(data_acesso__date=hoje).count(),
    'acessos_mes': UserAccess.objects.filter(data_acesso__year=atual.year, data_acesso__month = atual.month).count(),
  }

  return render(request, 'dash.html', context)

@login_required
def profile(request):
  return render(request, 'profile.html')

def home(request):
  return render(request, 'home.html')

@login_required
@csrf_exempt
def register(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    face_image_data = request.POST['face_image']
    face_image_data = face_image_data.split(",")[1]
    face_image = ContentFile(base64.b64decode(face_image_data), name=f'{username}_.jpg')

    try:
       user = User.objects.create(username = username)
    except Exception as e:
      return JsonResponse({
      'status': 'error', 'message':'Usário já registrado'
    })

    UserImages.objects.create(user = user, face_image = face_image)
    return JsonResponse({
      'status': 'success', 'message':'Usuário registrado com sucesso!'
    })
  return render(request, 'register_face.html')

@login_required
@csrf_exempt
def login_user(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    face_image_data = request.POST['face_image']

    try:
      user = User.objects.get(username = username)
    except User.DoesNotExist:
      return JsonResponse({
      'status': 'error', 'message':'Usário Inválido'
    })
    face_image_data = face_image_data.split(",")[1]
    uploaded_image = ContentFile(base64.b64decode(face_image_data), name=f'{username}_.jpg')

    uploaded_face_image = face_recognition.load_image_file(uploaded_image)
    uploaded_face_ecoding = face_recognition.face_encodings(uploaded_face_image)

    if uploaded_face_ecoding:
      uploaded_face_ecoding = uploaded_face_ecoding[0]
      user_image = UserImages.objects.filter(user = user).last()
      stored_face_image = face_recognition.load_image_file(user_image.face_image.path)
      stored_face_encoding = face_recognition.face_encodings(stored_face_image)

      match = face_recognition.compare_faces(stored_face_encoding, uploaded_face_ecoding)

      if match[0]:
        UserAccess.objects.create(
          user = user,
        )
        return JsonResponse({'status' : 'success', 'message' : 'Acesso registrado com sucesso!'})
      else:
        return JsonResponse({'status' : 'error', 'message' : 'Falha ao registrar acesso.'})
  return render(request, 'login_face.html')
