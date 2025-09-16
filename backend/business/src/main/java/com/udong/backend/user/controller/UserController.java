package com.udong.backend.user.controller;

import com.udong.backend.user.service.UserService;
import com.udong.backend.user.dto.SignUpRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@Valid @RequestBody SignUpRequest req) {
        userService.signUp(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
