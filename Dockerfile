FROM node:12 as builder

COPY ./ /node
WORKDIR /node

RUN yarn && yarn build

FROM node:12-alpine

COPY --from=builder /node /usr/local/share/prbot
WORKDIR /usr/local/share/prbot

RUN yarn --production

EXPOSE 3000

STOPSIGNAL SIGINT

ENTRYPOINT yarn start