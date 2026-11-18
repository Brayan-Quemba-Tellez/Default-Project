from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.chat import ChatConversation, ChatMessage
from app.repositories.base import BaseRepository


class ChatRepository(BaseRepository[ChatConversation]):
    def __init__(self, session: AsyncSession):
        super().__init__(ChatConversation, session)

    async def get_by_session_id(self, session_id: str) -> Optional[ChatConversation]:
        result = await self.session.execute(
            select(ChatConversation).where(ChatConversation.session_id == session_id)
        )
        return result.scalars().first()

    async def get_messages(self, conversation_id: UUID) -> List[ChatMessage]:
        result = await self.session.execute(
            select(ChatMessage)
            .where(ChatMessage.conversation_id == conversation_id)
            .order_by(ChatMessage.created_at.asc())
        )
        return list(result.scalars().all())

    async def add_message(self, message: ChatMessage) -> ChatMessage:
        self.session.add(message)
        await self.session.commit()
        await self.session.refresh(message)
        return message
