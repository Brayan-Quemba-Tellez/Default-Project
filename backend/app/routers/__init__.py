from fastapi import APIRouter
from app.routers import auth, users, categories, products, cart, orders, appointments, quotations, blog, contact, chat, consent, analytics

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(cart.router, prefix="/cart", tags=["Cart"])
api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(quotations.router, prefix="/quotations", tags=["Quotations"])
api_router.include_router(blog.router, prefix="/blog", tags=["Blog"])
api_router.include_router(contact.router, prefix="/contact", tags=["Contact"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(consent.router, prefix="/consent", tags=["Consent"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
