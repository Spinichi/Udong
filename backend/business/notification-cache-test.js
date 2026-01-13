import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 커스텀 메트릭: 에러율 추적
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // 10초 동안 100명까지 증가
    { duration: '30s', target: 100 }, // 30초 동안 100명 유지
    { duration: '10s', target: 0 },   // 10초 동안 0명까지 감소
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% 요청이 500ms 이하
    errors: ['rate<0.1'],              // 에러율 10% 미만
  },
};

// 테스트할 동아리 ID (실제 DB에 존재하는 ID로 변경 필요)
const CLUB_ID = 2;

// JWT 토큰 (환경변수로 전달 또는 직접 입력)
const JWT_TOKEN = __ENV.JWT_TOKEN || 'Your_Token';

export default function () {
  const url = `http://localhost:8080/api/v1/me/notifications/unread-count?clubId=${CLUB_ID}`;

  const params = {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    tags: { name: 'UnreadNotificationCount' },
  };

  const res = http.get(url, params);

  // 응답 검증
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has valid response': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.data !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  // 에러율 기록
  errorRate.add(!success);

  // 사용자의 페이지 이동 시뮬레이션 (0.5초 대기)
  sleep(0.5);
}

// 테스트 종료 시 요약 출력
export function handleSummary(data) {
  return {
    'stdout': JSON.stringify({
      'avg_duration': data.metrics.http_req_duration.values.avg,
      'p95_duration': data.metrics.http_req_duration.values['p(95)'],
      'p99_duration': data.metrics.http_req_duration.values['p(99)'],
      'requests_total': data.metrics.http_reqs.values.count,
      'requests_per_sec': data.metrics.http_reqs.values.rate,
      'error_rate': data.metrics.errors ? data.metrics.errors.values.rate : 0,
    }, null, 2),
  };
}
