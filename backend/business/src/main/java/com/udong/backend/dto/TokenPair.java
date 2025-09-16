package com.udong.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenPair {
    private String accessToken;
    private String refreshToken;
}
