package com.curriculum.auth.infrastructure.repository;

import com.curriculum.auth.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  Optional<User> findByFullName(String fullName);

  boolean existsByEmail(String email);
}
