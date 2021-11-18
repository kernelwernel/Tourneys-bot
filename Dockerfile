FROM node:17-alpine3.14 as base

WORKDIR /home/node/app

COPY package.json ./

RUN apk add --no-cache nodejs-current \
&& npm install -g nodemon \
&& npm install -g ts-node \
&& npm install

COPY . .

EXPOSE 4000

LABEL org.opencontainers.image.source="https://github.com/Existential-nonce/tourneys-bot"

RUN adduser -D tourneys-bot
USER tourneys-bot

CMD ["ts-node", "./src/index.ts"]