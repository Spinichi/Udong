package com.udong.backend.dutchpay.repository;

import com.udong.backend.dutchpay.dto.DutchpayListResponse;
import com.udong.backend.dutchpay.entity.Dutchpay;
import com.udong.backend.users.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DutchpayRepository extends JpaRepository<Dutchpay, Integer> {

    @Query("SELECT new com.udong.backend.dutchpay.dto.DutchpayListResponse(" +
            "d.id, d.createdAt, d.note, d.amount, COUNT(DISTINCT dp), " +
            "d.event.id, e.title, d.isDone) " +
            "FROM Dutchpay d " +
            "JOIN d.participants dp " +
            "JOIN d.event e " +
            "WHERE dp.user.id = :userId " +  // 참여한 정산만 필터링
            "AND e.club.id = :clubId " +     // 동아리 ID 조건 추가
            "GROUP BY d.id, d.createdAt, d.note, d.amount, d.event.id, e.title, d.isDone")
    List<DutchpayListResponse> findSummaryByUserIdAndClubId(@Param("userId") Integer userId, @Param("clubId") Integer clubId);

    @Query("SELECT COUNT(DISTINCT dp) " +
            "FROM DutchpayParticipant dp " +
            "WHERE dp.dutchpay.id = :dutchpayId")
    Long getParticipantCount(@Param("dutchpayId") Integer dutchpayId);




    // 상세 조회 시 event, createdBy, participants.user 를 한 방에 가져오기
    @EntityGraph(attributePaths = {"event", "createdBy", "participants.user"})
    Optional<Dutchpay> findWithAllById(Integer id);

    // ===== 통계 쿼리 (Redis 캐싱 대상) =====

    /**
     * 동아리별 최근 30일 더치페이 통계 - 기본 집계
     * 4개 테이블 JOIN + 집계 함수 → Redis 캐싱 대상
     */
    interface MonthlyStatsProjection {
        Long getTotalDutchpays();
        Long getTotalAmount();
        Double getAvgAmount();
        Integer getMaxAmount();
        Long getUniqueParticipants();
    }

    @Query(value = """
        SELECT
            COUNT(DISTINCT d.id) as totalDutchpays,
            COALESCE(SUM(d.amount), 0) as totalAmount,
            COALESCE(AVG(d.amount), 0) as avgAmount,
            COALESCE(MAX(d.amount), 0) as maxAmount,
            COUNT(DISTINCT dp.user_id) as uniqueParticipants
        FROM dutchpays d
        JOIN events e ON e.id = d.event_id
        LEFT JOIN dutchpay_participants dp ON dp.dutchpay_id = d.id
        WHERE e.club_id = :clubId
          AND d.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        """, nativeQuery = true)
    MonthlyStatsProjection findMonthlyStatsByClubId(@Param("clubId") Integer clubId);

    /**
     * 동아리별 최근 30일 상위 5명 지출자
     */
    interface TopPayerProjection {
        Integer getUserId();
        String getUserName();
        Long getTotalAmount();
        Integer getDutchpayCount();
    }

    @Query(value = """
        SELECT
            u.id as userId,
            u.name as userName,
            COUNT(d.id) as dutchpayCount,
            SUM(d.amount) as totalAmount
        FROM dutchpays d
        JOIN events e ON e.id = d.event_id
        JOIN users u ON u.id = d.created_by
        WHERE e.club_id = :clubId
          AND d.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY u.id, u.name
        ORDER BY totalAmount DESC
        LIMIT 5
        """, nativeQuery = true)
    List<TopPayerProjection> findTopPayersByClubId(@Param("clubId") Integer clubId);
}
