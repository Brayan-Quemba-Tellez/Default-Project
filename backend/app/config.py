from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/pymedb"
    REDIS_URL: str = "redis://localhost:6379/0"
    JWT_SECRET_KEY: str = "tu-clave-secreta-super-segura"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    WOMPI_API_KEY: str = ""
    WOMPI_API_URL: str = "https://api-sandbox.wompi.co"
    SALESFORCE_API_KEY: str = ""
    SALESFORCE_API_URL: str = "https://login.salesforce.com"
    SENDGRID_API_KEY: str = ""
    SENDGRID_FROM_EMAIL: str = "no-reply@tudominio.com"
    GA_TRACKING_ID: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    CLOUDWATCH_LOG_GROUP: str = "/aws/fastapi/pymedb"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
