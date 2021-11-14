FROM nodemon:alpine

WORKDIR /app
COPY package.json ./

RUN apk add --update
RUN apk upgrade --available && sync
RUN apk add --no-cache nodejs-current nodejs-npm
RUN npm install -g npm@8.1.3
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["nodemon", "src/index.ts"]