import asyncio
from celery import Celery
from app.config import settings

celery_app = Celery(
    "pymedb_tasks",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.tasks.email_tasks", "app.tasks.crm_tasks", "app.tasks.analytics_tasks", "app.tasks.report_tasks"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="America/Bogota",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_reject_on_worker_lost=True,
    task_annotations={
        "app.tasks.email_tasks.send_welcome_email": {"rate_limit": "10/m"},
        "app.tasks.email_tasks.send_order_confirmation": {"rate_limit": "5/m"},
    },
)
