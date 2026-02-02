import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 커스텀 메트릭: 실패율
const errorRate = new Rate('errors');

// 테스트 설정
export const options = {
  stages: [
    { duration: '10s', target: 50 },  // 0 → 50명까지 증가 (10초)
    { duration: '30s', target: 50 },  // 50명 유지 (30초)
    { duration: '10s', target: 0 },   // 50 → 0명까지 감소 (10초)
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% < 500ms, 99% < 1s
    errors: ['rate<0.1'], // 에러율 10% 미만
  },
};

// 환경 변수 (실행 시 설정 가능)
const BASE_URL = __ENV.BASE_URL;
const CLUB_ID = __ENV.CLUB_ID; // 테스트 데이터의 club_id
const ACCESS_TOKEN = __ENV.ACCESS_TOKEN;

export default function () {
  const url = `${BASE_URL}/api/v1/clubs/${CLUB_ID}/stats/dutchpay/monthly`;

  const params = {
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  // API 요청
  const res = http.get(url, params);

  // 검증
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'has data': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.success === true && body.data !== null;
      } catch (e) {
        return false;
      }
    },
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // 실패 시 에러율 증가
  errorRate.add(!success);

  // 요청 간 간격 (0.5~1.5초 랜덤)
  sleep(Math.random() * 1 + 0.5);
}
