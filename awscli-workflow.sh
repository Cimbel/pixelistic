#!/bin/bash


# install dependencies

pip3 install awscli --user --upgrade 2> /dev/null
pip3 install awsebcli --user --upgrade 2> /dev/null


# create artifact

cd ./pixelapp_be
zip -r $ARTIFACT_NAME ./* ./**/*
cd ../ && mkdir my_project_deploy
cd my_project_deploy && mv ../pixelapp_be/$ARTIFACT_NAME ./


# configure awscli

mkdir ~/.aws 2> /dev/null
cat <<EOF > ~/.aws/config
[default]
region = $AWS_APP_REGION
output = json
EOF

cat <<EOF > ~/.aws/credentials
[default]
aws_access_key_id = $AWS_ACCESS_KEY
aws_secret_access_key = $AWS_SECRET_KEY
EOF


# configure config.yml for awsebcli app

mkdir .elasticbeanstalk
cat <<EOF > .elasticbeanstalk/config.yml
branch-defaults:
  default:
    environment: $ENV_NAME
deploy:
  artifact: $ARTIFACT_NAME
global:
  application_name: $APP_NAME
  default_region: $AWS_APP_REGION
EOF


# checking if installed

find / -name "eb" -user root -perm 0755 2> /dev/null
find / -name "aws" -user root -perm 0755 2> /dev/null

# deploy new version

$(which eb) deploy --label "Version-2"
