FROM node:24.13.0 AS build

WORKDIR /app
COPY makefile .

COPY package.json .
COPY package-lock.json .
RUN make install

COPY . .
RUN make build
