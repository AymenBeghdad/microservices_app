FROM node:16

COPY ./microservices/api-gateway /api-gateway

WORKDIR /api-gateway

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]