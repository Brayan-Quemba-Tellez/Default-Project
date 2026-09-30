from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.config import settings
from app.middleware import setup_middleware
from app.routers import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await app.startup()
    yield
    await app.shutdown()

app = FastAPI(
    title="PyMEs Platform API",
    description="API para plataforma de gestión PyMEs y e-commerce",
    version="1.0.0",
    lifespan=lifespan,
)

setup_middleware(app)
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "pymedb-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
