#!/bin/sh


# Build all Docker images in order

cd qgis-server3/
docker build -t napkingis/qgis-server:3.4 .
cd ..

cd django/
docker build -t napkingis/django --build-arg version=dev .
cd ..

cd settings/
docker build -t napkingis/settings .
cd ..

cd webapp-container/
docker build -t napkingis/webapp-container .
cd ..

cd webclient/
docker build -t napkingis/web-map .
cd ..

cd settings/web/
docker build -t napkingis/web-user .
cd -

cd accounts/
docker build -t napkingis/web-accounts .
cd ..
