from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.services.category_service import CategoryService
from app.services.product_service import ProductService
from app.services.cart_service import CartService
from app.services.order_service import OrderService
from app.services.appointment_service import AppointmentService
from app.services.quotation_service import QuotationService
from app.services.blog_service import BlogService
from app.services.contact_service import ContactService
from app.services.chat_service import ChatService
from app.services.consent_service import ConsentService
from app.services.analytics_service import AnalyticsService
from app.services.payment_service import PaymentService
from app.services.email_service import EmailService, email_service
from app.services.crm_service import CRMService, crm_service
from app.services.cache_service import CacheService, cache_service

__all__ = [
    "AuthService",
    "UserService",
    "CategoryService",
    "ProductService",
    "CartService",
    "OrderService",
    "AppointmentService",
    "QuotationService",
    "BlogService",
    "ContactService",
    "ChatService",
    "ConsentService",
    "AnalyticsService",
    "PaymentService",
    "EmailService",
    "email_service",
    "CRMService",
    "crm_service",
    "CacheService",
    "cache_service",
]
