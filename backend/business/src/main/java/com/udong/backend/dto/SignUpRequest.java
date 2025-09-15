package com.udong.backend.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public record SignUpRequest(
        @NotBlank @Email @Size(max = 100) String email,
        @NotBlank @Size(min = 8, max = 64) String password,
        @NotBlank @Size(max = 50) String name,
        @Size(max = 30) String university,
        @Size(max = 60) String major,
        @Size(max = 60) String residence,
        @Size(max = 13) String phone,
        @NotBlank String gender, // "M" 또는 "F"
        @NotBlank @Size(max = 30) String account,
        List<AvailabilityItem> availability // 선택 입력
) {
    public record AvailabilityItem(
            @NotNull Integer dayOfWeek,
            @NotNull String startTime, // "18:00"
            @NotNull String endTime    // "21:00"
    ) {}
}
