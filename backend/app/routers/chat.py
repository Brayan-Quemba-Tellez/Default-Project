from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import ChatStart, ChatResponse, ConsentBase as ConsentCreate, ConsentResponse
from app.schemas.chat import ChatMessageCreate, ChatMessageResponse
from app.services.chat_service import ChatService
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/start", status_code=status.HTTP_201_CREATED)
async def start_conversation(
    chat: ChatStart,
    session: AsyncSession = Depends(get_session),
):
    """Iniciar conversación de chat (público o autenticado)."""
    service = ChatService(session)
    return await service.start_conversation(chat)


@router.post("/message")
async def send_message(
    message_data: ChatMessageCreate,
    session: AsyncSession = Depends(get_session),
):
    """Enviar mensaje al chatbot."""
    service = ChatService(session)
    return await service.send_message(message_data)


@router.get("/history/{session_id}")
async def get_history(
    session_id: str,
    session: AsyncSession = Depends(get_session),
):
    """Obtener historial de conversación."""
    service = ChatService(session)
    return await service.get_history(session_id)
