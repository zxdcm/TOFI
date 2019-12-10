import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scraper.settings')

app = Celery('scraper')
app.config_from_object('django.conf:settings')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'save-deposits': {
        'task': 'api.tasks.save_deposits',
        'schedule': crontab(minute=0, hour=0),
    },
}
