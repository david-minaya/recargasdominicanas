FROM node:16

ARG API

ARG IMAGES_DOMAIN

ARG GITHUB_TOKEN

WORKDIR /app

COPY package*.json ./

COPY .npmrc ./

RUN npm config set '//npm.pkg.github.com/:_authToken'=$GITHUB_TOKEN

RUN npm install

COPY . .

RUN npm run build

CMD npm start
