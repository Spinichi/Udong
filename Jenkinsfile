pipeline {
    agent any

    environment {
        // [수정] SSH 접속 정보를 변수로 관리하면 편리합니다.
        HOST_USER = 'ubuntu'      // 호스트 머신 사용자 이름
        HOST_IP = '172.17.0.1'
        PROJECT_DIR = '/home/ubuntu/udong'
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
                    // 최초 커밋 등 히스토리가 1개일 때 오류 방지를 위해 || echo "all" 추가
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD || echo "all"',
                        returnStdout: true
                    ).trim()
                    
                    echo "Changed files: ${changedFiles}"
                    
                    env.FRONTEND_CHANGED = (changedFiles.contains('frontend/') || changedFiles == 'all') ? 'true' : 'false'
                    env.BUSINESS_CHANGED = (changedFiles.contains('backend/business/') || changedFiles == 'all') ? 'true' : 'false'
                    env.CHAT_CHANGED = (changedFiles.contains('backend/chatting/') || changedFiles == 'all') ? 'true' : 'false'
                    
                    echo "Frontend changed: ${env.FRONTEND_CHANGED}"
                    echo "Business API changed: ${env.BUSINESS_CHANGED}"
                    echo "Chat API changed: ${env.CHAT_CHANGED}"
                    
                    // 변경된 서비스가 없으면 마지막 커밋이 Jenkinsfile 수정 등일 수 있으므로 전체 배포
                    if (!changedFiles.contains('frontend/') && !changedFiles.contains('backend/business/') && !changedFiles.contains('backend/chatting/')) {
                        env.FRONTEND_CHANGED = 'true'
                        env.BUSINESS_CHANGED = 'true'
                        env.CHAT_CHANGED = 'true'
                        echo "No specific service changes detected, deploying all services"
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
                        // [수정] sshagent 블록으로 원격 명령 실행
                        sshagent(credentials: ['host-ssh-key']) { // 2단계에서 만든 Credential ID
                            sh """
                                ssh -o StrictHostKeyChecking=no ${HOST_USER}@${HOST_IP} '''
                                    echo "--- Deploying Frontend on Host ---"
                                    cd ${PROJECT_DIR}
                                    echo "Pulling latest changes from GitLab..."
                                    git pull
                                    docker-compose build frontend
                                    docker-compose up -d --no-deps frontend
                                '''
                            """
                        }
                        echo 'Frontend deployment completed!'
                    }
                }
                
                stage('Deploy Business API') {
                    when {
                        environment name: 'BUSINESS_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Building and deploying Business API...'
                        // [수정] sshagent 블록으로 원격 명령 실행
                        sshagent(credentials: ['host-ssh-key']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${HOST_USER}@${HOST_IP} '''
                                    echo "--- Deploying Business API on Host ---"
                                    cd ${PROJECT_DIR}
                                    echo "Pulling latest changes from GitLab..."
                                    git pull
                                    docker-compose build business-api
                                    docker-compose up -d --no-deps business-api
                                '''
                            """
                        }
                        echo 'Business API deployment completed!'
                    }
                }
                
                stage('Deploy Chat API') {
                    when {
                        environment name: 'CHAT_CHANGED', value: 'true'
                    }
                    steps {
                        echo 'Building and deploying Chat API...'
                        // [수정] sshagent 블록으로 원격 명령 실행
                        sshagent(credentials: ['host-ssh-key']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${HOST_USER}@${HOST_IP} '''
                                    echo "--- Deploying Chat API on Host ---"
                                    cd ${PROJECT_DIR}
                                    echo "Pulling latest changes from GitLab..."
                                    git pull
                                    docker-compose build chat-api
                                    docker-compose up -d --no-deps chat-api
                                '''
                            """
                        }
                        echo 'Chat API deployment completed!'
                    }
                }
            }
        }

        stage('Cleanup') {
            // 항상 실행되도록 post 블록으로 이동하는 것을 추천하지만, 일단 유지
            steps {
                echo 'Cleaning up unused Docker images on host...'
                // [수정] sshagent 블록으로 원격 명령 실행
                sshagent(credentials: ['host-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${HOST_USER}@${HOST_IP} 'docker image prune -f'
                    """
                }
                echo "Cleanup completed!"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished at ${new Date()}"
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}