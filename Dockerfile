FROM node:alpine

RUN apk update -y
RUN apk upgrade -y

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

CMD ["nodemon", "src/index.ts"]