package com.curriculum.auth.domain.model;

import jakarta.persistence.*;

// Superclass for Users
@Entity
@Table(name = "User")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role")
public abstract class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Column(name = "full_name")
  private String fullName;

  @Column(name = "selected_program_code_sia")
  private String selectedProgramCodeSia;

  // Return Role enum instead of String
  public abstract Role getRole();

  public String getRoleString() {
    return getRole().getDiscriminatorValue();
  }

  public User() {
  }

  public User(String fullName, String email, String passwordHash, String programCode) {
    this.fullName = fullName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.selectedProgramCodeSia = programCode;
  }

  public Integer getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public String getFullName() {
    return fullName;
  }

  public String getSelectedProgramCodeSia() {
    return selectedProgramCodeSia;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public void setSelectedProgramCodeSia(String selectedProgramCodeSia) {
    this.selectedProgramCodeSia = selectedProgramCodeSia;
  }
}
