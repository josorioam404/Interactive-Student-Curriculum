package com.curriculum.auth.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Clase que almacena las request de register en un formato util para verificación 
public class RegisterRequest {

  @NotBlank
  private String fullName;

  @Email
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  private String selectedProgramCodeSia;

  public RegisterRequest() {
  }

  public RegisterRequest(String fullName, String email, String password, String selectedProgramCodeSia) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.selectedProgramCodeSia = selectedProgramCodeSia;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getSelectedProgramCodeSia() {
    return selectedProgramCodeSia;
  }

  public void setSelectedProgramCodeSia(String selectedProgramCodeSia) {
    this.selectedProgramCodeSia = selectedProgramCodeSia;
  }
}
