-- =====================================================
-- 복합 인덱스 성능 측정용 대량 테스트 데이터 생성
-- vote_selections 테이블에 10,000개 레코드 삽입
-- =====================================================

-- 1. 기존 테스트 데이터 정리 (선택 사항)
-- DELETE FROM vote_selections WHERE vote_id BETWEEN 101 AND 110;
-- DELETE FROM vote_options WHERE vote_id BETWEEN 101 AND 110;
-- DELETE FROM votes WHERE id BETWEEN 101 AND 110;

-- 1-1. 실제로 존재하는 club_id와 chat_room_id 확인 (먼저 실행해서 값 확인)
-- SELECT id FROM clubs LIMIT 1;
-- SELECT id FROM chat_rooms LIMIT 1;

-- 2. 테스트용 투표 10개 생성 (ID: 101~110)
-- 주의: 아래 쿼리를 실행하기 전에 실제 존재하는 club_id와 chat_room_id로 변경해야 합니다.
-- 또는 아래 주석을 풀고 실행하여 자동으로 가져오도록 하세요.

-- 방법 1: 수동으로 club_id와 chat_room_id 확인 후 아래 INSERT 문의 값을 변경
-- 방법 2: 아래 프로시저를 사용하여 자동으로 기존 ID 가져오기

DELIMITER $$

DROP PROCEDURE IF EXISTS insert_test_votes$$

CREATE PROCEDURE insert_test_votes()
BEGIN
    DECLARE existing_club_id INT;
    DECLARE existing_chat_room_id INT;
    DECLARE existing_user_id INT;

    -- 실제로 존재하는 ID 가져오기
    SELECT id INTO existing_club_id FROM clubs LIMIT 1;
    SELECT id INTO existing_chat_room_id FROM chat_rooms LIMIT 1;
    SELECT id INTO existing_user_id FROM users LIMIT 1;

    -- 투표 10개 생성
    INSERT INTO votes (id, club_id, title, description, ends_at, multi_select, is_active, chat_room_id, created_by, created_at)
    VALUES
        (101, existing_club_id, '성능 테스트 투표 #1', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (102, existing_club_id, '성능 테스트 투표 #2', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (103, existing_club_id, '성능 테스트 투표 #3', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (104, existing_club_id, '성능 테스트 투표 #4', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (105, existing_club_id, '성능 테스트 투표 #5', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (106, existing_club_id, '성능 테스트 투표 #6', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (107, existing_club_id, '성능 테스트 투표 #7', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (108, existing_club_id, '성능 테스트 투표 #8', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (109, existing_club_id, '성능 테스트 투표 #9', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW()),
        (110, existing_club_id, '성능 테스트 투표 #10', '인덱스 성능 측정을 위한 테스트 투표입니다.', '2026-12-31 23:59:59', false, true, existing_chat_room_id, existing_user_id, NOW());
END$$

DELIMITER ;

-- 프로시저 실행
CALL insert_test_votes();

-- 3. 각 투표당 3개 옵션 생성 (총 30개)
-- vote_options Entity에는 text 컬럼만 존재합니다 (option_order, max_count 없음)
INSERT INTO vote_options (vote_id, text, created_at)
VALUES
    -- 투표 101
    (101, '옵션 A', NOW()),
    (101, '옵션 B', NOW()),
    (101, '옵션 C', NOW()),
    -- 투표 102
    (102, '옵션 A', NOW()),
    (102, '옵션 B', NOW()),
    (102, '옵션 C', NOW()),
    -- 투표 103
    (103, '옵션 A', NOW()),
    (103, '옵션 B', NOW()),
    (103, '옵션 C', NOW()),
    -- 투표 104
    (104, '옵션 A', NOW()),
    (104, '옵션 B', NOW()),
    (104, '옵션 C', NOW()),
    -- 투표 105
    (105, '옵션 A', NOW()),
    (105, '옵션 B', NOW()),
    (105, '옵션 C', NOW()),
    -- 투표 106
    (106, '옵션 A', NOW()),
    (106, '옵션 B', NOW()),
    (106, '옵션 C', NOW()),
    -- 투표 107
    (107, '옵션 A', NOW()),
    (107, '옵션 B', NOW()),
    (107, '옵션 C', NOW()),
    -- 투표 108
    (108, '옵션 A', NOW()),
    (108, '옵션 B', NOW()),
    (108, '옵션 C', NOW()),
    -- 투표 109
    (109, '옵션 A', NOW()),
    (109, '옵션 B', NOW()),
    (109, '옵션 C', NOW()),
    -- 투표 110
    (110, '옵션 A', NOW()),
    (110, '옵션 B', NOW()),
    (110, '옵션 C', NOW());

-- 4. vote_selections 대량 데이터 생성 (10,000건)
-- 투표 101~110 각각에 1,000명의 사용자가 참여
-- user_id: 1~1000 (각 투표당 동일한 사용자 ID 범위 사용)

-- 프로시저 생성: 대량 데이터 삽입
DELIMITER $$

DROP PROCEDURE IF EXISTS generate_vote_selections$$

CREATE PROCEDURE generate_vote_selections()
BEGIN
    DECLARE vote_id_val INT;
    DECLARE user_id_val INT;
    DECLARE option_id_val INT;
    DECLARE vote_counter INT DEFAULT 101;
    DECLARE user_counter INT;

    -- 투표 101~110 반복
    WHILE vote_counter <= 110 DO
        SET user_counter = 1;

        -- 각 투표당 1,000명의 사용자 참여
        WHILE user_counter <= 1000 DO
            -- 옵션 ID 계산: 투표 101의 첫 번째 옵션부터 순차적으로
            -- vote_options 테이블의 실제 ID를 조회하여 사용
            SELECT id INTO option_id_val
            FROM vote_options
            WHERE vote_id = vote_counter
            ORDER BY id LIMIT 1;

            -- vote_selections 삽입
            INSERT INTO vote_selections (vote_id, user_id, vote_option_id, option_count, created_at)
            VALUES (vote_counter, user_counter, option_id_val, 1, NOW());

            SET user_counter = user_counter + 1;
        END WHILE;

        SET vote_counter = vote_counter + 1;
    END WHILE;
END$$

DELIMITER ;

-- 5. 프로시저 실행 (약 10~30초 소요)
CALL generate_vote_selections();

-- 6. 프로시저 삭제 (정리)
DROP PROCEDURE IF EXISTS generate_vote_selections;

-- 7. 생성된 데이터 확인
SELECT
    'Total vote_selections' AS metric,
    COUNT(*) AS count
FROM vote_selections
WHERE vote_id BETWEEN 101 AND 110

UNION ALL

SELECT
    'By vote_id' AS metric,
    vote_id AS count
FROM vote_selections
WHERE vote_id BETWEEN 101 AND 110
GROUP BY vote_id
ORDER BY metric DESC, count;

-- 8. 인덱스 없이 쿼리 성능 측정 (Before)
-- 실행 전 EXPLAIN ANALYZE 사용 권장
-- EXPLAIN ANALYZE
SELECT COUNT(*)
FROM vote_selections
WHERE vote_id = 105 AND user_id = 500;
