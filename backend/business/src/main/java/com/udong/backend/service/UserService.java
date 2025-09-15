package com.udong.backend.service;

import com.udong.backend.entity.User;
import com.udong.backend.entity.UserAvailability;
import com.udong.backend.dto.SignUpRequest;
import com.udong.backend.repository.UserRepository;
import com.udong.backend.util.AesUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AesUtil aesUtil;

    @Transactional
    public void signUp(SignUpRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        User user = User.builder()
                .email(req.email())
                .passwordHash(passwordEncoder.encode(req.password()))
                .name(req.name())
                .university(req.university())
                .major(req.major())
                .residence(req.residence())
                .phone(req.phone())
                .gender(User.Gender.valueOf(req.gender())) // "M"/"F"만 허용
                .accountHash(aesUtil.encrypt(req.account()))
                .build();

        // 가능 시간 같이 들어오면 추가
        if (req.availability() != null) {
            for (var a : req.availability()) {
                UserAvailability ua = UserAvailability.builder()
                        .dayOfWeek(a.dayOfWeek())
                        .startTime(LocalTime.parse(a.startTime()))
                        .endTime(LocalTime.parse(a.endTime()))
                        .build();
                user.addAvailability(ua); // 양방향 세팅 (cascade로 함께 저장)
            }
        }

        User saved = userRepository.save(user);
//        return new SignUpResponse(saved.getId(), saved.getEmail(), saved.getName());
    }
}
