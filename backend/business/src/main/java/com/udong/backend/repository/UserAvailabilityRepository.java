package com.udong.backend.repository;

import com.udong.backend.entity.UserAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvailabilityRepository extends JpaRepository<UserAvailability, Long> {}
