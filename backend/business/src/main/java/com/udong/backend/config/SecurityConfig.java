package com.udong.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())                 // 개발 편의용: CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/test", "/api/vi/users/signup", "/actuator/**", "/h2-console/**").permitAll()
                        .anyRequest().permitAll()                 // 모든 요청 허용
                )
                .httpBasic(Customizer.withDefaults());        // 필요 없으면 .disable()로 꺼도 됨
        return http.build();
    }
}
