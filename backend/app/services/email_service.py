import logging
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    """
    Servicio de emails transaccionales mediante SendGrid.
    Soporta plantillas HTML predefinidas y fallback a logs locales en modo desarrollo.
    """

    SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"

    def __init__(self):
        self.api_key = settings.SENDGRID_API_KEY
        self.from_email = settings.SENDGRID_FROM_EMAIL

    async def send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
        plain_text: Optional[str] = None,
    ) -> bool:
        """Envía un correo electrónico a través de SendGrid API."""
        if not self.api_key:
            logger.info(
                f"[MODO DESARROLLO - EMAIL SIMULADO]\n"
                f"Para: {to_email}\n"
                f"Asunto: {subject}\n"
                f"Contenido: {plain_text or html_content[:200]}..."
            )
            return True

        payload = {
            "personalizations": [{"to": [{"email": to_email}]}],
            "from": {"email": self.from_email, "name": "Plataforma PyMEs"},
            "subject": subject,
            "content": [
                {"type": "text/html", "value": html_content},
            ],
        }
        if plain_text:
            payload["content"].insert(0, {"type": "text/plain", "value": plain_text})

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(self.SENDGRID_API_URL, json=payload, headers=headers)
                if res.status_code in (200, 202):
                    return True
                logger.error(f"Error al enviar email SendGrid: {res.status_code} - {res.text}")
                return False
        except Exception as e:
            logger.error(f"Fallo de conexión al enviar email con SendGrid: {e}")
            return False

    async def send_welcome_email(self, to_email: str, user_name: str) -> bool:
        """Template 'welcome': Bienvenida al registrarse."""
        subject = "¡Bienvenido a la Plataforma PyMEs!"
        html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
            <h2 style="color: #2563eb;">¡Hola, {user_name}!</h2>
            <p>Gracias por unirte a nuestra plataforma integral para la gestión y crecimiento de tu negocio.</p>
            <p>Ya puedes explorar nuestro catálogo, gestionar tus citas técnicas y solicitar cotizaciones personalizadas.</p>
            <a href="http://localhost:3000/login" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 15px;">Ir a mi cuenta</a>
        </div>
        """
        return await self.send_email(to_email, subject, html, f"Bienvenido {user_name} a Plataforma PyMEs.")

    async def send_order_confirmation(self, to_email: str, order_id: str, total: float) -> bool:
        """Template 'order_confirmation': Confirmación de pedido."""
        subject = f"Confirmación de Pedido #{order_id}"
        html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #059669;">¡Tu pedido ha sido recibido con éxito!</h2>
            <p>Número de pedido: <strong>{order_id}</strong></p>
            <p>Total a pagar: <strong>${total:,.0f} COP</strong></p>
            <p>Nos pondremos en contacto tan pronto tu pedido sea procesado y enviado.</p>
        </div>
        """
        return await self.send_email(to_email, subject, html)

    async def send_appointment_reminder(self, to_email: str, title: str, scheduled_date: str, scheduled_time: str) -> bool:
        """Template 'appointment_reminder': Recordatorio de cita."""
        subject = f"Recordatorio de Cita: {title}"
        html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #2563eb;">Recordatorio de tu cita agendada</h2>
            <p>Servicio: <strong>{title}</strong></p>
            <p>Fecha: <strong>{scheduled_date}</strong> a las <strong>{scheduled_time}</strong></p>
            <p>Te esperamos puntualmente. Si necesitas reprogramar, hazlo desde tu panel de usuario.</p>
        </div>
        """
        return await self.send_email(to_email, subject, html)

    async def send_quotation_sent(self, to_email: str, quotation_id: str, total: float) -> bool:
        """Template 'quotation_sent': Cotización enviada."""
        subject = f"Tu Cotización #{quotation_id} está lista"
        html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #4f46e5;">Cotización elaborada</h2>
            <p>Hemos preparado la cotización solicitada (Referencia: <strong>{quotation_id}</strong>).</p>
            <p>Valor total estimado: <strong>${total:,.0f} COP</strong></p>
            <p>Puedes revisarla en detalle en la plataforma.</p>
        </div>
        """
        return await self.send_email(to_email, subject, html)

    async def send_password_reset(self, to_email: str, reset_token: str) -> bool:
        """Template 'password_reset': Recuperación de contraseña."""
        subject = "Recuperación de contraseña"
        html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2>Restablecer contraseña</h2>
            <p>Has solicitado restablecer tu contraseña. Usa el siguiente código o enlace temporal:</p>
            <p style="font-size: 18px; font-weight: bold; background: #f1f5f9; padding: 10px; text-align: center;">{reset_token}</p>
        </div>
        """
        return await self.send_email(to_email, subject, html)


email_service = EmailService()
