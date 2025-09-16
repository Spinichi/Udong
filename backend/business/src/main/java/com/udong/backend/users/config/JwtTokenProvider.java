package com.udong.backend.users.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY_STR;

    private SecretKey KEY;

    private final long ACCESS_EXPIRATION = 1000L * 60 * 60 * 10; // 10시간
    private final long REFRESH_EXPIRATION = 1000L * 60 * 60 * 24 * 180; // 6개월

    @PostConstruct
    void init() {
        // 문자열을 HMAC 키로 변환 (길이 32바이트 이상 필요)
        this.KEY = Keys.hmacShaKeyFor(SECRET_KEY_STR.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(String userId, String role) {
        return createToken(userId, role, ACCESS_EXPIRATION);
    }

    public String createRefreshToken(String userId, String role) {
        return createToken(userId, role, REFRESH_EXPIRATION);
    }

    private String createToken(String userId, String role, long validityMs) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + validityMs);

        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(exp)
                .signWith(KEY, Jwts.SIG.HS256)   // ✅ SecretKey 사용
                .compact();
    }

    /* ====== 검증/파싱 ====== */
    public boolean validate(String token) {
        try {
            Jwts.parser().verifyWith(KEY).build().parseSignedClaims(token); // ✅ SecretKey로 검증
            return true;
        } catch (ExpiredJwtException e) {
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /* ===== 조회 ===== */
    public String getUserId(String token) {
        Object v = parseClaims(token).get("userId");
        return v == null ? null : v.toString();
    }

    public String getRole(String token) {
        Object role = parseClaims(token).get("role");
        return role == null ? "ROLE_USER" : role.toString();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(KEY)   // ✅ 항상 KEY 사용
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
