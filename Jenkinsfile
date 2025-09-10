pipeline {
    agent any
    
    environment {
        PROJECT_DIR = '/home/ubuntu/udong'
        COMPOSE_PROJECT_NAME = 'udong'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out dev branch from GitLab...'
                checkout scm
            }
        }
        
        stage('Detect Changes') {
            steps {
                script {
                    echo "Detecting changed files..."
                    
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD || echo "all"',
                        returnStdout: true
                    ).trim()
                    
                    echo "Changed files: ${changedFiles}"
                    
                    // 각 서비스별 변경 여부 확인
                    env.FRONTEND_CHANGED = (changedFiles.contains('frontend/') || changedFiles == 'all') ? 'true' : 'false'
                    env.BUSINESS_CHANGED = (changedFiles.contains('backend/business/') || changedFiles == 'all') ? 'true' : 'false'
                    env.CHAT_CHANGED = (changedFiles.contains('backend/chatting/') || changedFiles == 'all') ? 'true' : 'false'
                    
                    echo "Frontend changed: ${env.FRONTEND_CHANGED}"
                    echo "Business API changed: ${env.BUSINESS_CHANGED}"
                    echo "Chat API changed: ${env.CHAT_CHANGED}"
                    
                    // 변경된 서비스가 없으면 모든 서비스 배포
                    if (env.FRONTEND_CHANGED == 'false' && env.BUSINESS_CHANGED == 'false' && env.CHAT_CHANGED == 'false') {
                        env.FRONTEND_CHANGED = 'true'
                        env.BUSINESS_CHANGED = 'true'
                        env.CHAT_CHANGED = 'true'
                        echo "No specific changes detected, deploying all services"
                    }
                }
            }
        }
        
        stage('Deploy Services') {
            parallel {
                stage('Deploy Frontend') {
                    when {
                        environment name: 'FRONTEND_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Building and deploying Frontend...'
                        sh '''
                            cd ${PROJECT_DIR}
                            docker-compose build frontend
                            docker-compose up -d --no-deps frontend
                        '''
                        echo 'Frontend deployment completed!'
                    }
                }
                
                stage('Deploy Business API') {
                    when {
                        environment name: 'BUSINESS_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Building and deploying Business API...'
                        sh '''
                            cd ${PROJECT_DIR}
                            docker-compose build business-api
                            docker-compose up -d --no-deps business-api
                        '''
                        echo 'Business API deployment completed!'
                    }
                }
                
                stage('Deploy Chat API') {
                    when {
                        environment name: 'CHAT_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Building and deploying Chat API...'
                        sh '''
                            cd ${PROJECT_DIR}
                            docker-compose build chat-api
                            docker-compose up -d --no-deps chat-api
                        '''
                        echo 'Chat API deployment completed!'
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                echo 'Cleaning up unused Docker images...'
                sh '''
                    docker image prune -f
                    echo "Cleanup completed!"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo "Pipeline finished at ${new Date()}"
        }
    }
}