#!/bin/sh
aws="$(cat .env | grep AWS_S3_URL | cut -d '=' -f 2)"
host="$(cat .env | grep HOST | cut -d '=' -f 2)"
be_port="$(cat .env | grep BE_PORT | cut -d '=' -f 2)"
sed -i "s|aws_url|$aws|g" ./src/const/node-server-config.js
sed -i "s|main_host|$host|g" ./src/const/node-server-config.js
sed -i "s|be_port|$be_port|g" ./src/const/node-server-config.js
