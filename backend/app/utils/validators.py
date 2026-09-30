from fastapi import Request
from fastapi.responses import JSONResponse
from app.config import settings

def rate_limiter(request: Request, limit: str = "100/minute"):
    pass

def error_handler(error: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"detail": "Error interno del servidor"},
    )

def validation_error_handler(error: dict) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={"detail": error},
    )
