FROM node:16.5.0-alpine3.14 as base

WORKDIR /home/node/app

COPY package.json ./

RUN apk update && apk upgrade
&& apk add --no-cache curl
&& apk add --no-cache nodejs-current \
&& curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
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