from app.database import engine, async_session_factory
from app.models import Base
from sqlalchemy.ext.asyncio import AsyncSession

async def test_connection():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database connected successfully")
