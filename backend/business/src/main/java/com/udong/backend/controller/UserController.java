package com.udong.backend.controller;

import com.udong.backend.dto.SignUpRequest;
import com.udong.backend.service.UserService;
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
