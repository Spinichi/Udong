package com.udong.backend.controller;

import com.udong.backend.common.ApiResponse;
import com.udong.backend.dto.LoginRequest;
import com.udong.backend.dto.RefreshTokenResponse;
import com.udong.backend.dto.TokenPair;
import com.udong.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        TokenPair tokens = authService.login(req);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + tokens.getAccessToken());

        // Refresh Token을 HttpOnly 쿠키에 담기
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(180))
                .sameSite("None") // 크로스 도메인 환경이면 None, 아니면 Lax
                .build();
        headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok()
                .headers(headers)
                .body(ApiResponse.ok("로그인 성공"));
    }
}
