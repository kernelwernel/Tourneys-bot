FROM nodemon:alpine

WORKDIR /app
COPY package.json ./

RUN apk add --no-cache \
&& apk add --no-cache nodejs-current nodejs-npm \
&& npm install -g npm@8.1.3 \
&& npm install

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["nodemon", "src/index.ts"]