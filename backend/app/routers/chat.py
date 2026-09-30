from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.schemas import ChatStart, ChatResponse, ChatHistoryItem, ConsentCreate, ConsentResponse
from app.services.chat_service import ChatService
from app.services.consent_service import ConsentService

router = APIRouter()

@router.post("/start", response_model=ChatResponse, status_code=status.HTTP_201_CREATED)
async def start_conversation(chat: ChatStart, session: AsyncSession = Depends(get_session)):
    service = ChatService(session)
    return await service.start_conversation(chat)

@router.post("/message")
async def send_message(message_data, session: AsyncSession = Depends(get_session)):
    service = ChatService(session)
    return await service.send_message(message_data)

@router.get("/history/{session_id}")
async def get_history(session_id: str, session: AsyncSession = Depends(get_session)):
    service = ChatService(session)
    return await service.get_history(session_id)
