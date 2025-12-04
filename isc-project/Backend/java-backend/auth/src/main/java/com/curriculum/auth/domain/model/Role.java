package com.curriculum.auth.domain.model;

// ENUM roles, reduce runtime errors wfor case sensitive errors
public enum Role {
  STUDENT("Student"),
  ADMIN("Admin");

  private final String discriminatorValue;

  Role(String discriminatorValue) {
    this.discriminatorValue = discriminatorValue;
  }

  public String getDiscriminatorValue() {
    return discriminatorValue;
  }

  public String toLowerCase() {
    return discriminatorValue.toLowerCase();
  }

  public String toUpperCase() {
    return discriminatorValue.toUpperCase();
  }

  // Parse from string (case-insensitive)
  public static Role fromString(String roleStr) {
    if (roleStr == null)
      return STUDENT;
    return roleStr.equalsIgnoreCase("admin") ? ADMIN : STUDENT;
  }
}
