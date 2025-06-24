import os
import asyncio
from openai import AsyncOpenAI
from dotenv import load_dotenv

# Clase para gestionar el historial del chat
class ChatManager:
    def __init__(self):
        load_dotenv()
        self.API_KEY = os.getenv("OPENAI_API_KEY")
        self.client = AsyncOpenAI(api_key=self.API_KEY)
        
        # Instrucciones de configuración inicial del sistema
        self.agents_general = [
            {"role": "system", "content": "Actua como un psicologo clinico cuyo principal objetivo es determinar rasgos psicologicos."},
            {"role": "system", "content": "Tu tarea principal es conversar con un paciente e intentar hallar sus caracteristicas de personalidad"},
            {"role": "system", "content": "El resultado el de cada interaccion sera un json que contenga un capo de rasgo encontrado y otro campo de la respuesta en si"},
            {"role": "system", "content": "Si no tienes datos suficientes para determinar el rasgos en el campo rasgo encontrado lo pondras commo null"},
            {"role": "system", "content": "Desarrolla la converdacion de forma muy amable"},
        ]
        
        # Historial de mensajes
        self.mensajes_historial = self.agents_general.copy()  # Copiamos las instrucciones iniciales

    async def chat_with_agent(self, mensajes):
        print("Procesando petición...")
        chat_completion = await self.client.chat.completions.create(
            model="gpt-4o-mini",  # O el modelo que estés utilizando
            messages=mensajes,
        )
        response = chat_completion.choices[0].message.content
        print("Respuesta recibida.")
        return response

    async def preguntar_a_openai(self, mensaje):
        # Agregar el mensaje del usuario al historial
        self.mensajes_historial.append({"role": "user", "content": f'Mejora la ultima version con estas instrucciones: {mensaje}'})
        
        # Obtener la respuesta del modelo con el historial actualizado
        respuesta = await self.chat_with_agent(self.mensajes_historial)
        print(f"Respuesta generada: {respuesta}")
        
        return respuesta

    def agregar_mejora(self, mejora):
        # Añadir una mejora al historial
        self.mensajes_historial.append({"role": "user", "content": f"Mejora la respuesta con lo siguiente: {mejora}"})
        print("Mejora añadida al historial.")

    def añadir_ultima_version(self, ultiVersion):
        self.mensajes_historial.append({"role": "user", "content": f"Esta es la ultima version del componente: {ultiVersion}"})
        print("Ultima version en area de analisis")
    
    async def iniciar_chat(self):
        print("Chat iniciado. Escribe 'salir' para terminar la conversación.\n")
        while True:
            entrada_usuario = input("Tú: ")
            if entrada_usuario.lower() == "salir":
                print("Sesión finalizada.")
                break

            # Añade el mensaje del usuario al historial
            self.mensajes_historial.append({"role": "user", "content": entrada_usuario})

            # Llama al modelo y obtiene respuesta
            respuesta = await self.chat_with_agent(self.mensajes_historial)

            # Añade respuesta del asistente al historial
            self.mensajes_historial.append({"role": "assistant", "content": respuesta})

            print(f"Asistente: {respuesta}\n")



# Ejemplo de uso:
async def mainBeta():
    chat_manager = ChatManager()

    # Primera llamada: inicializa el chat y envía el primer mensaje
    mensaje_inicial = "Hola, ¿cómo puedo responder a este foro?"
    respuesta_inicial = await chat_manager.preguntar_a_openai(mensaje_inicial)
    
    # Si no estás conforme con la respuesta, puedes pedir una mejora
    usuario_conforme = input("¿Estás conforme con la respuesta? (sí/no): ").strip().lower()
    
    if usuario_conforme == "no":
        mejora = input("¿Qué mejorarías en la respuesta?: ").strip()
        chat_manager.agregar_mejora(mejora)
        
        # Enviar la mejora y obtener la nueva respuesta
        nueva_respuesta = await chat_manager.preguntar_a_openai(mensaje_inicial)
        print(f"Nueva respuesta después de la mejora: {nueva_respuesta}")
    else:
        print("Respuesta finalizada.")

async def main():
    a = ChatManager()
    await a.iniciar_chat()
asyncio.run(main())


