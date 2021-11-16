FROM node:17-alpine3.14 as base

WORKDIR /home/node/app

COPY package.json ./

RUN apk add --no-cache nodejs-current \
&& npm install -g nodemon \
&& npm install -g npm@8.1.3 \
&& npm install

COPY . .

EXPOSE 4000

CMD ["nodemon", "./src/index.ts"]