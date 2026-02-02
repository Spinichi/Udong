package com.udong.backend.dutchpay.controller;

import com.udong.backend.dutchpay.dto.DutchpayMonthlyStatsResponse;
import com.udong.backend.dutchpay.service.DutchpayStatsService;
import com.udong.backend.global.dto.response.ApiResponse;
import com.udong.backend.global.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 더치페이 통계 API
 * Redis 캐싱 적용 대상
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/clubs/{clubId}/stats/dutchpay")
public class DutchpayStatsController {

    private final DutchpayStatsService statsService;
    private final SecurityUtils securityUtils;

    /**
     * 동아리별 최근 30일 더치페이 통계 조회
     *
     * GET /api/v1/clubs/{clubId}/stats/dutchpay/monthly
     *
     * @param clubId 동아리 ID
     * @return 통계 데이터
     */
    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse<DutchpayMonthlyStatsResponse>> getMonthlyStats(
            @PathVariable Integer clubId
    ) {
        // 인증 확인 (선택사항: 동아리 멤버인지 검증)
        Integer userId = securityUtils.currentUserId();

        DutchpayMonthlyStatsResponse stats = statsService.getMonthlyStats(clubId);
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
