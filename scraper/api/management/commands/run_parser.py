from django.core.management.base import BaseCommand
from scripts.fin_parser import run


class Command(BaseCommand):
    help = 'Run scraper for MyFin'

    def handle(self, *args, **options):
        run()

