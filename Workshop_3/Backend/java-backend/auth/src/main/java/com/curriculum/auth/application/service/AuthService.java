package com.curriculum.auth.application.service;

import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.domain.model.Admin;
import com.curriculum.auth.domain.model.Role;
import com.curriculum.auth.domain.model.Student;
import com.curriculum.auth.domain.model.User;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import com.curriculum.auth.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

// Auth service principal class, student public, admin private 
@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  // REGISTER STUDENT - Public endpoint
  public AuthResponse registerStudent(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already registered");
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    User user = new Student(
        request.getFullName(),
        request.getEmail(),
        hashedPassword,
        request.getSelectedProgramCodeSia());

    User saved = userRepository.save(user);
    return buildAuthResponse(saved);
  }

  // REGISTER ADMIN - Protected endpoint (admin only)
  public AuthResponse registerAdmin(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already registered");
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    // Create Admin user
    User user = new Admin(
        request.getFullName(),
        request.getEmail(),
        hashedPassword);

    User saved = userRepository.save(user);
    return buildAuthResponse(saved);
  }

  // LOGIN
  public AuthResponse login(LoginRequest request) {
    var maybeUser = userRepository.findByEmail(request.getEmail());
    if (maybeUser.isEmpty()) {
      throw new RuntimeException("Invalid credentials");
    }

    User user = maybeUser.get();
    if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
      throw new RuntimeException("Invalid credentials");
    }

    return buildAuthResponse(user);
  }

  // Build AuthResponse
  private AuthResponse buildAuthResponse(User user) {
    Role role = user.getRole();
    String roleStr = role.toLowerCase();

    Map<String, Object> claims = new HashMap<>();
    claims.put("role", roleStr);
    claims.put("userId", String.valueOf(user.getId()));

    String token = jwtService.generateToken(user.getEmail(), claims);

    return new AuthResponse(
        token,
        String.valueOf(user.getId()),
        user.getFullName(),
        roleStr,
        user.getEmail(),
        "Ingeniería",
        user.getSelectedProgramCodeSia());
  }
}
