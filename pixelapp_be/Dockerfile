FROM node:14-alpine3.13

RUN apk update && \
    apk upgrade && \ 
    apk add python2 make g++ && \
    mkdir pixelapp_be
WORKDIR pixelapp_be

COPY . .

RUN npm install && \
    npm audit fix --force

EXPOSE 3000

ENTRYPOINT ["node", "./bin/www"]
