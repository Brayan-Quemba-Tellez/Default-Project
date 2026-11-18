from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
import uuid
from app.models.chat import ChatConversation, ChatMessage
from app.schemas import ChatStart


# Base de conocimiento del chatbot
BOT_KNOWLEDGE = {
    "horario": "Nuestro horario de atención es de lunes a viernes de 8am a 6pm y sábados de 9am a 1pm.",
    "servicios": "Ofrecemos desarrollo web, consultoría tecnológica, mantenimiento de sistemas y más.",
    "contacto": "Puedes contactarnos por WhatsApp al +57 300 000 0000 o por email a contacto@empresa.com.",
    "ubicacion": "Estamos ubicados en Bogotá, Colombia. También atendemos de forma remota.",
    "presupuesto": "Para solicitar un presupuesto, usa nuestra sección de Cotizaciones o escríbenos directamente.",
    "default": "Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto. También puedes llamarnos al +57 300 000 0000.",
}


class ChatMessageCreate:
    pass


class ChatService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def start_conversation(self, chat_data: ChatStart) -> ChatConversation:
        conversation = ChatConversation(
            session_id=chat_data.session_id,
            user_id=chat_data.user_id,
            status="active",
        )
        self.session.add(conversation)
        await self.session.commit()
        await self.session.refresh(conversation)
        return conversation

    async def send_message(self, message_data) -> dict:
        data = message_data.model_dump() if hasattr(message_data, "model_dump") else message_data.dict() if hasattr(message_data, "dict") else message_data

        conversation_id = data.get("conversation_id")
        message_text = data.get("message", "")
        sender = data.get("sender", "user")

        # Guardar mensaje del usuario
        user_msg = ChatMessage(
            conversation_id=conversation_id,
            sender=sender,
            message=message_text,
        )
        self.session.add(user_msg)

        # Generar respuesta del bot
        bot_response = self._generate_bot_response(message_text)
        bot_msg = ChatMessage(
            conversation_id=conversation_id,
            sender="bot",
            message=bot_response,
        )
        self.session.add(bot_msg)
        await self.session.commit()

        return {"bot_response": bot_response, "message_id": str(user_msg.id)}

    def _generate_bot_response(self, message: str) -> str:
        message_lower = message.lower()
        for keyword, response in BOT_KNOWLEDGE.items():
            if keyword != "default" and keyword in message_lower:
                return response
        return BOT_KNOWLEDGE["default"]

    async def get_history(self, session_id: str) -> list[ChatMessage]:
        conv_result = await self.session.execute(
            select(ChatConversation).where(ChatConversation.session_id == session_id)
        )
        conversation = conv_result.scalar_one_or_none()
        if not conversation:
            return []

        result = await self.session.execute(
            select(ChatMessage)
            .where(ChatMessage.conversation_id == conversation.id)
            .order_by(ChatMessage.created_at.asc())
        )
        return list(result.scalars().all())
