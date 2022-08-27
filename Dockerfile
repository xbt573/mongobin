FROM node:lts-alpine

WORKDIR /app

RUN yarn
RUN yarn build

CMD yarn start
