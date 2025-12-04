package com.curriculum.auth.application.service;

import com.curriculum.auth.domain.model.LogEntry;
import com.curriculum.auth.infrastructure.repository.LogEntryRepository;
import com.curriculum.auth.infrastructure.repository.UserRepository;
import org.springframework.stereotype.Service;

// Servicio de almacenamiento de logs de admin
@Service
public class AuditLogService {

  private final LogEntryRepository logEntryRepository;
  private final UserRepository userRepository;

  public AuditLogService(LogEntryRepository logEntryRepository,
      UserRepository userRepository) {
    this.logEntryRepository = logEntryRepository;
    this.userRepository = userRepository;
  }

  // Creates a log entry for an admin action.

  public void logAdminAction(Integer adminUserId, String actionType, String targetEntity, String targetId,
      String details) {
    LogEntry entry = new LogEntry(adminUserId, actionType, targetEntity, targetId, details);
    logEntryRepository.save(entry);
  }
}
