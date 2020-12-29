FROM node:12-alpine AS webapp

WORKDIR /web/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM napkingis/webapp-container

COPY --from=webapp /web/dist/ /var/www
CMD /bin/true
