FROM nodemon:alpine as base

WORKDIR /home/node/app
COPY package.json ./

RUN apk add --no-cache nodejs-current nodejs-npm \
&& npm install -g nodemon \
&& npm install

COPY . .

FROM base as production

ENV NODEPATH=./build

RUN npm run build
RUN npm run start

EXPOSE 8080

CMD ["nodemon", "src/index.ts"]