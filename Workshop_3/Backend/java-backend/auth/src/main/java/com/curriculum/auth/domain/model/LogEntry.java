package com.curriculum.auth.domain.model;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Maps to existing AuditLog table.
 */
@Entity
@Table(name = "auditLog")
public class LogEntry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "admin_user_id", nullable = false)
  private Integer adminUserId;

  @Column(name = "action_type", nullable = false)
  private String actionType;

  @Column(name = "target_entity")
  private String targetEntity;

  @Column(name = "target_id")
  private String targetId;

  @Column(name = "details", columnDefinition = "TEXT")
  private String details;

  @Column(name = "timestamp")
  private Instant timestamp;

  public LogEntry() {
  }

  public LogEntry(Integer adminUserId, String actionType, String targetEntity, String targetId, String details) {
    this.adminUserId = adminUserId;
    this.actionType = actionType;
    this.targetEntity = targetEntity;
    this.targetId = targetId;
    this.details = details;
    this.timestamp = Instant.now();
  }

  // Getters and setters
  public Integer getId() {
    return id;
  }

  public Integer getAdminUserId() {
    return adminUserId;
  }

  public void setAdminUserId(Integer adminUserId) {
    this.adminUserId = adminUserId;
  }

  public String getActionType() {
    return actionType;
  }

  public void setActionType(String actionType) {
    this.actionType = actionType;
  }

  public String getTargetEntity() {
    return targetEntity;
  }

  public void setTargetEntity(String targetEntity) {
    this.targetEntity = targetEntity;
  }

  public String getTargetId() {
    return targetId;
  }

  public void setTargetId(String targetId) {
    this.targetId = targetId;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }

  public Instant getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Instant timestamp) {
    this.timestamp = timestamp;
  }
}
