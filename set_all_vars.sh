#!/bin/sh
echo "AWS_S3_URL=$AWS_S3_URL" > .env
echo "AWS_BUCKET_NAME=$AWS_BUCKET_NAME" >> .env
echo "G_PASS=$G_PASS" >> .env
echo "G_NAME=$G_NAME" >> .env
echo "BE_PORT=$BE_PORT" >> .env
echo "HOST=$HOST" >> .env
echo "FE_PORT=$FE_PORT" >> .env
echo "DB_USER=$DB_USER" >> .env
echo "DB_PASS=$DB_PASS" >> .env
echo "DB_NAME=$DB_NAME" >> .env
echo "MONGO_URI=mongodb://${DB_USER}:${DB_PASS}@mongo_db:27017/${DB_NAME}" >> .env