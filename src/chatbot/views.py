from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def chat_view(request):
    return render(request, 'chatbot/chat.html')

@csrf_exempt
def chat_send(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        mensaje = data.get('message', '')
        respuesta = f"Hola, dijiste: {mensaje}"
        return JsonResponse({'response': respuesta})
