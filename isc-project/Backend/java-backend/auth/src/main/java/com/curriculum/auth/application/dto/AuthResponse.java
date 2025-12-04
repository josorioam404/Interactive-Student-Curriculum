package com.curriculum.auth.application.dto;

// Clase que define las respuestas de autenticación que se retornan al Frontend
public class AuthResponse {

  private String token;
  private String userId;
  private String name;
  private String role;
  private String email;
  private String dept;
  private String programCode;

  public AuthResponse() {
  }

  public AuthResponse(String token, String userId, String name, String role,
      String email, String dept, String programCode) {
    this.token = token;
    this.userId = userId;
    this.name = name;
    this.role = role;
    this.email = email;
    this.dept = dept;
    this.programCode = programCode;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getDept() {
    return dept;
  }

  public void setDept(String dept) {
    this.dept = dept;
  }

  public String getProgramCode() {
    return programCode;
  }

  public void setProgramCode(String programCode) {
    this.programCode = programCode;
  }
}
