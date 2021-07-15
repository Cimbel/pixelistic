#!/bin/sh
echo "HOST=$HOST" > ./pixelapp_fe/.env
echo "AWS_S3_URL=$AWS_S3_URL" >> ./pixelapp_fe/.env
echo "BE_PORT=$BE_PORT" >> ./pixelapp_fe/.env