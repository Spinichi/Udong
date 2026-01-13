-- =====================================================
-- 복합 인덱스 추가: vote_selections(vote_id, user_id)
-- =====================================================

-- 1. 복합 인덱스 추가
CREATE INDEX idx_vote_user ON vote_selections(vote_id, user_id);

-- 2. 인덱스 생성 확인
SHOW INDEX FROM vote_selections;

-- 3. EXPLAIN ANALYZE로 성능 측정 (After)
EXPLAIN ANALYZE
SELECT COUNT(*)
FROM vote_selections
WHERE vote_id = 105 AND user_id = 500;
