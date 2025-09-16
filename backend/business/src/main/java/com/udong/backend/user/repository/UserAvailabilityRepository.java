package com.udong.backend.user.repository;

import com.udong.backend.user.entity.UserAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvailabilityRepository extends JpaRepository<UserAvailability, Long> {}
