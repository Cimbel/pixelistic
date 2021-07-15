pipeline{
	agent { label 'docker' }

	stages {
		stage("Build images") {

			environment{
				FE_PORT = credentials('fe-port')
				BE_PORT = credentials('be-port')
				G_PASS = credentials('g-pass')
				G_NAME = credentials('g-name')
				DB_NAME = credentials('db-name')
				DB_PASS = credentials('db-pass')
				DB_USER = credentials('db-user')
				AWS_S3_URL = credentials('aws-s3-url')
				AWS_BUCKET_NAME = credentials('aws-bucket-name')
				AWS_REGION = credentials('aws-region')
				AWS_KEY_ID = credentials('aws-key-id')
				AWS_SECRETE_KEY_ID = credentials('aws-secrete-key')
			}

			steps{
				sh "sed -i 's/\r//' ./aws_creds.sh ./set_fe_vars.sh ./set_all_vars.sh"
				sh "chmod 0700 ./aws_creds.sh ./set_fe_vars.sh ./set_all_vars.sh"
				sh "./aws_creds.sh && ./set_fe_vars.sh && ./set_all_vars.sh"
				sh "docker build -t pixelapp_be:latest ./pixelapp_be"
				sh "docker build -t pixelapp_fe:latest ./pixelapp_fe"
			}
		
		}

		stage("Push to registry"){
			environment{
				DOCKER_USER = credentials('docker-user-romik')
				DOCKER_PASS = credentials('docker-pass-romik')
			}

			steps{
				sh "docker login -u \$DOCKER_USER -p \$DOCKER_PASS"
				sh "docker tag pixelapp_be:latest \$DOCKER_USER/pixelapp_be:latest"
				sh "docker tag pixelapp_fe:latest \$DOCKER_USER/pixelapp_fe:latest"
				sh "docker push \$DOCKER_USER/pixelapp_be:latest"
				sh "docker push \$DOCKER_USER/pixelapp_fe:latest"
				sh "docker logout"
			}
		}

		stage("Deploy"){
			environment{
				HOST_USER = credentials('host-user')
				HOST_IP = credentials('host-ip')
			}
			steps{
				sh "scp ./docker-compose.yml \$HOST_USER@\$HOST_IP:/home/\$HOST_USER/pixelapp"
				sh "scp ./.env \$HOST_USER@\$HOST_IP:/home/\$HOST_USER/pixelapp"
				sh "ssh \$HOST_USER@\$HOST_IP docker-compose -f ./pixelapp/docker-compose.yml up -d"
				sh "sleep 30"
			}
		}
		
		stage("Clean workspace"){
			steps{
				sh "docker image prune -f"
				sh "rm -rf ./* ./.??*"
			}
		}
	}
}
