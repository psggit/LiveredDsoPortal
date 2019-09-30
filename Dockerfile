FROM node:8.11.2

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN yarn install

COPY ./ /app

RUN yarn run build

ENTRYPOINT ["yarn", "run", "start"]
