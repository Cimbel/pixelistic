# build container
FROM node:14-alpine3.13 as build-machine

ENV CI=true
RUN mkdir pixelapp_fe
WORKDIR pixelapp_fe

COPY . .

RUN apk update && \
    apk add python2 make g++ --no-cache && \
    chmod +x ./set_env.sh && \
    ./set_env.sh && \
    npm install && \
    npm audit fix --force && \
    npm run test && \
    npm run build

# main container
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/index.html

COPY --from=build-machine /pixelapp_fe/build /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
