package com.udong.backend.dutchpay.dto;

import java.util.List;

/**
 * 동아리별 최근 30일 더치페이 통계 응답 DTO
 * Redis 캐싱 대상 (TTL: 5분)
 */
public record DutchpayMonthlyStatsResponse(
        Integer totalDutchpays,        // 총 더치페이 개수
        Long totalAmount,               // 총 금액
        Double avgAmount,               // 평균 금액
        Integer maxAmount,              // 최대 금액
        Integer uniqueParticipants,     // 참여한 고유 유저 수
        List<TopPayer> topPayers        // 상위 5명 지출자
) {
    public record TopPayer(
            Integer userId,
            String userName,
            Long totalAmount,
            Integer dutchpayCount
    ) {}
}
