FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run build
