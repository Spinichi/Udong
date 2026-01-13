-- ===============================================
-- 투표 동시성 테스트용 데이터 생성 스크립트
-- ===============================================

USE udong;

-- 0. 기존 테스트 데이터 삭제 (역순으로 FK 제약조건 고려)
DELETE FROM vote_options WHERE vote_id IN (SELECT id FROM votes WHERE title LIKE '%점심%');
DELETE FROM vote_selections WHERE vote_id IN (SELECT id FROM votes WHERE title LIKE '%점심%');
DELETE FROM votes WHERE title LIKE '%점심%';
DELETE FROM chat_members WHERE chat_id IN (SELECT id FROM chat_rooms WHERE name LIKE '%테스트%');
DELETE FROM chat_rooms WHERE name LIKE '%테스트%';
DELETE FROM memberships WHERE club_id IN (SELECT id FROM clubs WHERE code_url = 'TEST001');
DELETE FROM clubs WHERE code_url = 'TEST001';
DELETE FROM users WHERE email IN ('user1@test.com', 'user2@test.com');

-- 1. 테스트 사용자 2명 생성

INSERT INTO users (email, password_hash, payment_password_hash, name, gender, account_key_ver, created_at, updated_at)
VALUES
('user1@test.com', '1', '1', '테스트유저1', 'M', 0, NOW(), NOW()),
('user2@test.com', '1', '1', '테스트유저2', 'F', 0, NOW(), NOW());

-- 사용자 ID 확인용 변수 (MySQL은 변수 사용이 제한적이므로 직접 ID 사용)
SET @user1_id = LAST_INSERT_ID();
SET @user2_id = @user1_id + 1;

-- 2. 테스트 동아리 생성
INSERT INTO clubs (name, category, description, code_url, created_at, account_cipher, account_key_ver, leader_user_id)
VALUES ('테스트동아리', '스터디', '투표 동시성 테스트용 동아리', 'TEST001', NOW(), '', 0, @user1_id);

SET @club_id = LAST_INSERT_ID();

-- 3. 동아리 멤버십 추가 (user1, user2 모두 동아리 가입)
INSERT INTO memberships (club_id, user_id, role_code, created_at)
VALUES
(@club_id, @user1_id, 'LEADER', NOW()),
(@club_id, @user2_id, 'MEMBER', NOW());

-- 4. 공용코드 삽입 (chat_rooms.type FK를 위해 필요)
-- code_group 테이블에 CHAT_TYPE 그룹 추가
INSERT IGNORE INTO code_group (group_name, name, is_use, created_at)
VALUES ('CHAT_TYPE', '채팅방유형', TRUE, NOW());

-- code_detail 테이블에 GLOBAL 타입 추가
INSERT IGNORE INTO code_detail (code_name, name, is_use, created_at, group_name)
VALUES ('GLOBAL', '전체방', TRUE, NOW(), 'CHAT_TYPE');

-- 5. 채팅방 생성 (GLOBAL 타입, target_id = club_id)
INSERT INTO chat_rooms (created_at, created_by, name, type, target_id, participants_confirmed, participants_confirmed_count)
VALUES (NOW(), @user1_id, '테스트동아리 전체방', 'GLOBAL', @club_id, TRUE, 2);

SET @chatroom_id = LAST_INSERT_ID();

-- 6. 채팅방 멤버 추가 (user1, user2 모두 참여)
INSERT INTO chat_members (joined_at, chat_id, user_id)
VALUES
(NOW(), @chatroom_id, @user1_id),
(NOW(), @chatroom_id, @user2_id);

-- 7. 투표 생성 (단일 선택, 2개 옵션)
INSERT INTO votes (club_id, title, description, ends_at, multi_select, is_active, created_at, chat_room_id, created_by)
VALUES (@club_id, '점심 메뉴 투표', '오늘 점심 뭐 먹을까요?', DATE_ADD(NOW(), INTERVAL 1 DAY), FALSE, TRUE, NOW(), @chatroom_id, @user1_id);

SET @vote_id = LAST_INSERT_ID();

-- 8. 투표 옵션 2개 생성
INSERT INTO vote_options (text, created_at, vote_id)
VALUES
('치킨', NOW(), @vote_id),
('피자', NOW(), @vote_id);

-- ===============================================
-- 데이터 확인 쿼리
-- ===============================================
SELECT '=== 사용자 ===' AS '테이블';
SELECT id, email, name FROM users WHERE email LIKE '%@test.com';

SELECT '=== 동아리 ===' AS '테이블';
SELECT id, name, code_url FROM clubs WHERE code_url = 'TEST001';

SELECT '=== 채팅방 ===' AS '테이블';
SELECT id, name, type, target_id FROM chat_rooms WHERE name LIKE '%테스트%';

SELECT '=== 투표 ===' AS '테이블';
SELECT id, title, multi_select, is_active FROM votes WHERE title LIKE '%점심%';

SELECT '=== 투표 옵션 ===' AS '테이블';
SELECT id, text, vote_id FROM vote_options WHERE vote_id = @vote_id;

-- ===============================================
-- JMeter 테스트용 정보 출력
-- ===============================================
SELECT
    CONCAT('투표 ID: ', v.id) AS JMeter_테스트_정보,
    CONCAT('API 엔드포인트: POST /api/v1/votes/', v.id, '/participate') AS 엔드포인트,
    CONCAT('사용자1 ID: ', @user1_id, ', 사용자2 ID: ', @user2_id) AS 사용자정보,
    CONCAT('옵션1 ID: ', (SELECT MIN(id) FROM vote_options WHERE vote_id = v.id),
           ', 옵션2 ID: ', (SELECT MAX(id) FROM vote_options WHERE vote_id = v.id)) AS 옵션정보
FROM votes v
WHERE v.id = @vote_id;
