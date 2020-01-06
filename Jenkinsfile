pipeline {
    agent none
    environment {
        APPLICATION = 'web'
    }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Version') {
            agent any
            steps {
                sh 'git tag 0.${BUILD_ID}.0'
                sh 'git remote set-url origin git@github.com:calxus/${APPLICATION}.git'
                sh 'git push origin --tags'
            }
        }
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build --tag docker.io/gtadam89/${APPLICATION}:0.${BUILD_ID}.0 .'
                sh 'docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"'
                sh 'docker push docker.io/gtadam89/${APPLICATION}:0.${BUILD_ID}.0'
                sh 'docker tag docker.io/gtadam89/${APPLICATION}:0.${BUILD_ID}.0 docker.io/gtadam89/${APPLICATION}:latest'
                sh 'docker push docker.io/gtadam89/${APPLICATION}:latest'
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'williamyeh/ansible:ubuntu16.04'
                    args '-v /root/.ssh:/root/.ssh -u root:root -e ANSIBLE_HOST_KEY_CHECKING=False'
                }
            }
            steps {
                sh 'ansible-playbook --private-key=/root/.ssh/id_rsa --user=${SSH_USERNAME} -i "${DEPLOY_HOST}," deploy/playbook.yml'
            }
        }
    }
}