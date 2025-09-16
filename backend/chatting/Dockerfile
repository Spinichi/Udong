FROM openjdk:21-jdk-slim

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y curl netcat-traditional

# 임시 테스트용 HTTP 서버 스크립트 생성
RUN echo '#!/bin/bash' > /start.sh && \
    echo 'echo "Chat API Server Starting on port 8081..."' >> /start.sh && \
    echo 'while true; do' >> /start.sh && \
    echo '  echo -e "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: 30\r\n\r\n{\"service\":\"chat\",\"status\":\"OK\"}" | nc -l -p 8081' >> /start.sh && \
    echo 'done' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 8081
CMD ["/start.sh"]
