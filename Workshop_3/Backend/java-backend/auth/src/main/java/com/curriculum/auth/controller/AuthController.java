package com.curriculum.auth.controller;

import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.dto.UpdateProgramRequest;
import com.curriculum.auth.application.service.AuthService;
import com.curriculum.auth.application.dto.ErrorResponse;
import com.curriculum.auth.domain.model.User;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

  private final AuthService authService;
  private final UserRepository userRepository;

  public AuthController(AuthService authService, UserRepository userRepository) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  // POST /auth/register
  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
    try {
      AuthResponse response = authService.registerStudent(request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException ex) {
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("BAD_REQUEST", ex.getMessage()));
    }
  }

  // POST /auth/login
  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    try {
      AuthResponse response = authService.login(request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException ex) {
      return ResponseEntity
          .status(HttpStatus.UNAUTHORIZED)
          .body(new ErrorResponse("UNAUTHORIZED", ex.getMessage()));
    }
  }

  // PUT /auth/update-program
  @PutMapping("/update-program")
  public ResponseEntity<?> updateProgram(
      @Valid @RequestBody UpdateProgramRequest request,
      Authentication authentication) {
    try {
      Integer userId = extractUserId(authentication);

      User user = userRepository.findById(userId)
          .orElseThrow(() -> new RuntimeException("User not found"));

      // Update program
      user.setSelectedProgramCodeSia(request.getProgramCode());
      userRepository.save(user);

      // Return updated user info
      return ResponseEntity.ok(new ProgramUpdateResponse(
          userId.toString(),
          user.getFullName(),
          user.getEmail(),
          request.getProgramCode(),
          "Program updated successfully"));
    } catch (RuntimeException ex) {
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("BAD_REQUEST", ex.getMessage()));
    }
  }

  // Helper: extract user ID from JWT
  private Integer extractUserId(Authentication auth) {
    Object details = auth.getDetails();
    if (details instanceof String s) {
      return Integer.parseInt(s);
    }
    throw new RuntimeException("Invalid authentication details");
  }

  // Inner DTO for response
  public static class ProgramUpdateResponse {
    private String userId;
    private String name;
    private String email;
    private String programCode;
    private String message;

    public ProgramUpdateResponse(String userId, String name, String email,
        String programCode, String message) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.programCode = programCode;
      this.message = message;
    }

    // Getters
    public String getUserId() {
      return userId;
    }

    public String getName() {
      return name;
    }

    public String getEmail() {
      return email;
    }

    public String getProgramCode() {
      return programCode;
    }

    public String getMessage() {
      return message;
    }
  }
}
