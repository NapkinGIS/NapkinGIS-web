FROM ubuntu:18.04
ARG version

# Install system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-setuptools \
    python3-pip \
    sqlite3 \
    python3-psycopg2 \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install -U pip

RUN pip3 install --no-cache-dir 'gunicorn>=19.9,<20.0' && \
    pip3 install --no-cache-dir 'supervisor>=4.1.0,<4.2.0'

COPY server/ /napkingis/server/
RUN pip3 install --no-cache-dir -r /napkingis/server/requirements.txt

# Create Django project
RUN echo "VERSION = '${version}'" > /napkingis/server/webgis/__init__.py && \
    pip3 install -e /napkingis/server/ && \
    mkdir -p /var/www/napkingis && \
    mkdir -p /var/log/django/ && \
    mkdir -p /var/log/gunicorn/ && \
    django-admin startproject --template=/napkingis/server/webgis/conf/project_template/ djproject /var/www/napkingis/


ENV PYTHONPATH $PYTHONPATH:/var/www/napkingis/
ENV DJANGO_SETTINGS_MODULE djproject.settings
ENV LANG C.UTF-8


# Configure Gunicorn and Supervisor
COPY gunicorn_conf.py /var/www/napkingis/gunicorn_conf.py
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf


EXPOSE 8000

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
