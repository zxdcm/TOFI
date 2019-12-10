FROM ubuntu

RUN apt-get update && apt-get install -y python3.7 python3-pip

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE scraper.settings

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt
ADD . /code/
EXPOSE 8000

CMD gunicorn --bind :8000 scraper.wsgi:application
