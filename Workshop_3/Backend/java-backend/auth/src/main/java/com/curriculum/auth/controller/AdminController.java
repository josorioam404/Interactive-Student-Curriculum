package com.curriculum.auth.controller;

import com.curriculum.auth.application.dto.AuthResponse;
import com.curriculum.auth.application.dto.ErrorResponse;
import com.curriculum.auth.application.dto.RegisterRequest;
import com.curriculum.auth.application.service.AuditLogService;
import com.curriculum.auth.application.service.AuthService;
import com.curriculum.auth.domain.model.LogEntry;
import com.curriculum.auth.infrastructure.repository.LogEntryRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

  private final LogEntryRepository logEntryRepository;
  private final AuditLogService auditLogService;
  private final AuthService authService;

  public AdminController(LogEntryRepository logEntryRepository,
      AuditLogService auditLogService,
      AuthService authService) {
    this.logEntryRepository = logEntryRepository;
    this.auditLogService = auditLogService;
    this.authService = authService;
  }

  // GET /admin/logs - ADMIN ONLY
  @GetMapping("/logs")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getLogs() {
    List<LogEntry> logs = logEntryRepository.findAllByOrderByTimestampDesc();
    return ResponseEntity.ok(logs);
  }

  // POST /admin/create-admin - ADMIN ONLY
  @PostMapping("/create-admin")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> createAdmin(
      @Valid @RequestBody RegisterRequest request,
      Authentication authentication) {
    try {
      // Create admin user
      AuthResponse response = authService.registerAdmin(request);

      // Log the action
      Integer adminId = extractUserId(authentication);
      auditLogService.logAdminAction(
          adminId,
          "CREATE_ADMIN",
          "User",
          response.getUserId(),
          "Created new admin: " + request.getEmail());

      return ResponseEntity.ok(response);
    } catch (RuntimeException ex) {
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(new ErrorResponse("BAD_REQUEST", ex.getMessage()));
    }
  }

  // Helper: extract admin user ID from JWT
  private Integer extractUserId(Authentication auth) {
    Object details = auth.getDetails();
    if (details instanceof String s) {
      return Integer.parseInt(s);
    }
    throw new RuntimeException("Invalid authentication details");
  }
}
