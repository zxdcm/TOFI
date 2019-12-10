from scripts.fin_parser import run
from scraper.celery import app


@app.task
def save_deposits():
    run()
