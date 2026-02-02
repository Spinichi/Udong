package com.udong.backend.dutchpay.service;

import com.udong.backend.dutchpay.dto.DutchpayMonthlyStatsResponse;
import com.udong.backend.dutchpay.repository.DutchpayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 더치페이 통계 서비스
 * Redis 캐싱 적용 대상
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DutchpayStatsService {

    private final DutchpayRepository dutchpayRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_KEY_PREFIX = "dutchpay:stats:monthly:";
    private static final long CACHE_TTL_MINUTES = 5;

    /**
     * 동아리별 최근 30일 더치페이 통계 조회
     * Redis Cache-Aside 패턴 적용
     *
     * Before Redis: avg=681ms, p95=1.2s, p99=1.8s (k6 50 concurrent users)
     * After Redis (예상): avg=5~10ms (cache hit), 681ms (cache miss)
     *
     * @param clubId 동아리 ID
     * @return 통계 데이터
     */
    @Transactional(readOnly = true)
    public DutchpayMonthlyStatsResponse getMonthlyStats(Integer clubId) {
        long startTime = System.currentTimeMillis();
        String cacheKey = CACHE_KEY_PREFIX + clubId;

        // 1. Redis에서 캐시 조회 (Cache-Aside Pattern)
        try {
            Object cached = redisTemplate.opsForValue().get(cacheKey);
            if (cached instanceof DutchpayMonthlyStatsResponse cachedResponse) {
                long endTime = System.currentTimeMillis();
                log.info(">>> [CACHE HIT] getMonthlyStats(clubId={}) 실행 시간: {}ms", clubId, (endTime - startTime));
                return cachedResponse;
            }
        } catch (Exception e) {
            log.warn(">>> Redis 캐시 조회 실패 (clubId={}): {}", clubId, e.getMessage());
            // Redis 장애 시에도 DB 조회는 정상 동작하도록 계속 진행
        }

        // 2. Cache Miss → DB 조회
        log.info(">>> [CACHE MISS] DB 조회 시작 (clubId={})", clubId);
        DutchpayMonthlyStatsResponse response = fetchFromDatabase(clubId);

        // 3. Redis에 캐시 저장 (TTL: 5분)
        try {
            redisTemplate.opsForValue().set(cacheKey, response, CACHE_TTL_MINUTES, TimeUnit.MINUTES);
            log.info(">>> Redis 캐시 저장 완료 (key={}, TTL={}분)", cacheKey, CACHE_TTL_MINUTES);
        } catch (Exception e) {
            log.warn(">>> Redis 캐시 저장 실패 (clubId={}): {}", clubId, e.getMessage());
            // 저장 실패해도 응답은 정상 반환
        }

        long endTime = System.currentTimeMillis();
        log.info(">>> [CACHE MISS] getMonthlyStats(clubId={}) 총 실행 시간: {}ms", clubId, (endTime - startTime));

        return response;
    }

    /**
     * DB에서 통계 데이터 조회
     */
    private DutchpayMonthlyStatsResponse fetchFromDatabase(Integer clubId) {
        // 기본 통계
        DutchpayRepository.MonthlyStatsProjection stats =
            dutchpayRepository.findMonthlyStatsByClubId(clubId);

        // 상위 지출자
        List<DutchpayRepository.TopPayerProjection> topPayersProj =
            dutchpayRepository.findTopPayersByClubId(clubId);

        List<DutchpayMonthlyStatsResponse.TopPayer> topPayers = topPayersProj.stream()
            .map(p -> new DutchpayMonthlyStatsResponse.TopPayer(
                p.getUserId(),
                p.getUserName(),
                p.getTotalAmount(),
                p.getDutchpayCount()
            ))
            .toList();

        return new DutchpayMonthlyStatsResponse(
            stats.getTotalDutchpays() != null ? stats.getTotalDutchpays().intValue() : 0,
            stats.getTotalAmount() != null ? stats.getTotalAmount() : 0L,
            stats.getAvgAmount() != null ? stats.getAvgAmount() : 0.0,
            stats.getMaxAmount() != null ? stats.getMaxAmount() : 0,
            stats.getUniqueParticipants() != null ? stats.getUniqueParticipants().intValue() : 0,
            topPayers
        );
    }
}
