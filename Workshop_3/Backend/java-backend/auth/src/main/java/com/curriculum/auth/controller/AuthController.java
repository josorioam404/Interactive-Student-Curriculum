
package com.curriculum.auth.controller;

import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.application.dto.LoginRequest;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.service.AuthService;
import com.curriculum.auth.application.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  // POST /auth/register - PUBLIC (Students only)
  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
    try {
      // Force role to be student - ignore whatever frontend sends
      AuthResponse response = authService.registerStudent(request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException ex) {
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("BAD_REQUEST", ex.getMessage()));
    }
  }

  // POST /auth/login - PUBLIC
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
}
