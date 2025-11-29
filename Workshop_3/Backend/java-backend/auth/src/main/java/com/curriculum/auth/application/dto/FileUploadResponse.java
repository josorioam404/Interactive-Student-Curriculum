package com.curriculum.auth.application.dto;

public class FileUploadResponse {

  private boolean success;
  private String message;
  private int recordsProcessed;
  private int recordsCreated;
  private int recordsUpdated;
  private int recordsFailed;
  private String fileName;

  public FileUploadResponse() {
  }

  public FileUploadResponse(boolean success, String message, int recordsProcessed,
      int recordsCreated, int recordsUpdated, int recordsFailed,
      String fileName) {
    this.success = success;
    this.message = message;
    this.recordsProcessed = recordsProcessed;
    this.recordsCreated = recordsCreated;
    this.recordsUpdated = recordsUpdated;
    this.recordsFailed = recordsFailed;
    this.fileName = fileName;
  }

  // Getters and Setters
  public boolean isSuccess() {
    return success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public int getRecordsProcessed() {
    return recordsProcessed;
  }

  public void setRecordsProcessed(int recordsProcessed) {
    this.recordsProcessed = recordsProcessed;
  }

  public int getRecordsCreated() {
    return recordsCreated;
  }

  public void setRecordsCreated(int recordsCreated) {
    this.recordsCreated = recordsCreated;
  }

  public int getRecordsUpdated() {
    return recordsUpdated;
  }

  public void setRecordsUpdated(int recordsUpdated) {
    this.recordsUpdated = recordsUpdated;
  }

  public int getRecordsFailed() {
    return recordsFailed;
  }

  public void setRecordsFailed(int recordsFailed) {
    this.recordsFailed = recordsFailed;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }
}
