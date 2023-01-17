FROM node:19

ARG DIST_FILES
ARG NODE_MODULES

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

COPY configs /app/configs

RUN yarn && \
    yarn run build && \
    yarn cache clean

CMD node dist/index.js --unhandled-rejections=strict --max-old-space-size=200
EXPOSE 8080
