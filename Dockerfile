FROM node:10.15-alpine

ENV NODE_ENV production
EXPOSE 3000

RUN mkdir -p /usr/src/app && \
    mkdir -p /usr/src/app/node_modules && \
    mkdir -p /usr/src/app/src && \
    chown node:node -R /usr/src/app

WORKDIR /usr/src/app
USER node

COPY package*.json ./

RUN npm install --production

COPY ./src ./src/

ENTRYPOINT [ "node", "src/index.js" ]
