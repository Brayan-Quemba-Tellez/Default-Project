from fastapi import Request
from fastapi.responses import JSONResponse
from app.config import settings
import re

def validate_colombian_phone(phone: str) -> bool:
    if not phone:
        return False
    clean = re.sub(r"\D", "", str(phone))
    return len(clean) == 10 and clean.startswith("3")

def validate_document_number(doc: str) -> bool:
    if not doc:
        return False
    clean = re.sub(r"\D", "", str(doc))
    return len(clean) >= 6

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
