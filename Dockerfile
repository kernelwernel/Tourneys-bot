FROM node:17.3.0-alpine as base

WORKDIR /home/node/app

COPY package.json ./

RUN apk update && apk upgrade \
&& apk add --no-cache nodejs-current \
&& npm install -g npm@8.13.2 \
&& npm install -g nodemon \
&& npm install -g ts-node \
&& npm install typescript \
&& npm install

COPY . .

EXPOSE 4000/tcp

LABEL org.opencontainers.image.source="https://github.com/Existential-nonce/tourneys-bot"
LABEL maintainer="nonce#0001"

RUN adduser -D tourneys-bot
USER tourneys-bot

CMD ["ts-node", "./src/index.ts"]