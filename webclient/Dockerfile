FROM node:12-alpine AS webapp

WORKDIR /webclient/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM napkingis/webapp-container

COPY --from=webapp /webclient/dist/ /var/www
CMD /bin/true
