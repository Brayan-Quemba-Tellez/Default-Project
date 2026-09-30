from app.tasks import celery_app

@celery_app.task(bind=True, max_retries=3)
def send_welcome_email(self, user_id: str):
    pass

@celery_app.task(bind=True, max_retries=3)
def send_order_confirmation(self, order_id: str):
    pass

@celery_app.task(bind=True, max_retries=3)
def send_appointment_reminder(self, appointment_id: str):
    pass

@celery_app.task(bind=True, max_retries=3)
def send_quotation_email(self, quotation_id: str):
    pass
