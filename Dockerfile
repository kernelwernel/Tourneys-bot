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




FROM node:15

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install

# Copy the app code
COPY . .

# Build the project
RUN npm run build

# Expose ports
EXPOSE 8080