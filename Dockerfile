FROM node:17.3.0 as build

WORKDIR /app
COPY . .
RUN npm install

FROM gcr.io/distroless/nodejs
COPY --from=build /app /

LABEL org.opencontainers.image.source="https://github.com/Existential-nonce/tourneys-bot"
LABEL maintainer="nonce#0001"

RUN adduser -D tourneys-bot-test
USER tourneys-bot-test

CMD ["ts-node", "./src/index.ts"]