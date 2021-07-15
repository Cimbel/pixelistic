#!/bin/sh
echo "{" > ./pixelapp_be/const/aws-config.json
echo "    \"accessKeyId\": \"$AWS_KEY_ID\", " >> ./pixelapp_be/const/aws-config.json
echo "    \"secretAccessKey\": \"$AWS_SECRETE_KEY_ID\", " >> ./pixelapp_be/const/aws-config.json
echo "    \"region\": \"$AWS_REGION\" " >> ./pixelapp_be/const/aws-config.json
echo "}" >> ./pixelapp_be/const/aws-config.json
