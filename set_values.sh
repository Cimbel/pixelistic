#!/bin/bash


# frontend variables

sed -i "s|main_host|$BACKEND_HOST|g" ./pixelapp_fe/src/const/node-server-config.js
sed -i "s|be_port|$BACKEND_PORT|g" ./pixelapp_fe/src/const/node-server-config.js
sed -i "s|aws_url|$BUCKET_URL_APP|g" ./pixelapp_fe/src/const/node-server-config.js


# backend variables

sed -i "s|AWS_ACCESS_KEY|$AWS_ACCESS_KEY|g" ./pixelapp_be/const/aws-config.json
sed -i "s|AWS_SECRET_KEY|$AWS_SECRET_KEY|g" ./pixelapp_be/const/aws-config.json
sed -i "s|AWS_APP_REGION|$AWS_APP_REGION|g" ./pixelapp_be/const/aws-config.json

sed -i "s|process.env.HOST|"\"$FRONTEND_HOST\""|g" ./pixelapp_be/const/node-config.js
sed -i "s|process.env.FE_PORT|"\"$FRONTEND_PORT\""|g" ./pixelapp_be/const/node-config.js

sed -i "s|process.env.G_NAME|"\"$G_NAME\""|g" ./pixelapp_be/routes/index.js
sed -i "s|process.env.G_PASS|"\"$G_PASS\""|g" ./pixelapp_be/routes/index.js

sed -i "s|process.env.AWS_BUCKET_NAME|"\"$BUCKET_NAME\""|g" ./pixelapp_be/routes/post.js

sed -i "s|mongodb://|$MONGO_URI|g" ./pixelapp_be/app.js
sed -i "s|<insertYourPassword>|$DB_PASS|g" ./pixelapp_be/app.js
sed -i "s|?ssl|$DB_NAME?ssl|g" ./pixelapp_be/app.js