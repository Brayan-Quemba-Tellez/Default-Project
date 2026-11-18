import json
import logging
from typing import Any, Optional
from datetime import datetime, timedelta
from app.config import settings

logger = logging.getLogger(__name__)


class CacheService:
    """
    Servicio de gestión de caché y sesiones con Redis.
    Incluye fallback a memoria volátil local si Redis no está disponible.
    """

    TTL_PRODUCTS = 3600       # 1 hora
    TTL_CATEGORIES = 7200     # 2 horas
    TTL_CONFIG = 86400        # 24 horas

    _memory_cache: dict[str, tuple[Any, Optional[datetime]]] = {}
    _redis_client = None

    def __init__(self):
        self._init_redis()

    def _init_redis(self):
        if not CacheService._redis_client and settings.REDIS_URL:
            try:
                import redis.asyncio as aioredis
                CacheService._redis_client = aioredis.from_url(
                    settings.REDIS_URL,
                    decode_responses=True,
                    socket_connect_timeout=2,
                )
            except Exception as e:
                logger.warning(f"No se pudo conectar a Redis ({e}). Usando fallback en memoria.")
                CacheService._redis_client = None

    async def get(self, key: str) -> Optional[Any]:
        """Obtiene un valor deserializado por clave."""
        if CacheService._redis_client:
            try:
                val = await CacheService._redis_client.get(key)
                if val:
                    return json.loads(val)
            except Exception as e:
                logger.warning(f"Error al leer de Redis ({e}). Fallback a memoria.")

        # Fallback en memoria
        item = CacheService._memory_cache.get(key)
        if item:
            val, expires_at = item
            if expires_at is None or expires_at > datetime.utcnow():
                return val
            del CacheService._memory_cache[key]
        return None

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Guarda un valor serializado en caché con tiempo de vida (TTL en segundos)."""
        serialized = json.dumps(value, default=str)
        if CacheService._redis_client:
            try:
                if ttl:
                    await CacheService._redis_client.setex(key, ttl, serialized)
                else:
                    await CacheService._redis_client.set(key, serialized)
                return True
            except Exception as e:
                logger.warning(f"Error al escribir en Redis ({e}). Fallback a memoria.")

        expires_at = datetime.utcnow() + timedelta(seconds=ttl) if ttl else None
        CacheService._memory_cache[key] = (value, expires_at)
        return True

    async def delete(self, key: str) -> bool:
        """Elimina una clave de la caché."""
        if CacheService._redis_client:
            try:
                await CacheService._redis_client.delete(key)
            except Exception:
                pass
        CacheService._memory_cache.pop(key, None)
        return True

    async def blacklist_token(self, token: str, ttl_seconds: int = 1800) -> bool:
        """Agrega un token JWT a la lista negra para invalidar su sesión."""
        key = f"bl:{token}"
        return await self.set(key, {"blacklisted": True}, ttl=ttl_seconds)

    async def is_token_blacklisted(self, token: str) -> bool:
        """Verifica si un token JWT ha sido revocado."""
        key = f"bl:{token}"
        val = await self.get(key)
        return bool(val)


cache_service = CacheService()
