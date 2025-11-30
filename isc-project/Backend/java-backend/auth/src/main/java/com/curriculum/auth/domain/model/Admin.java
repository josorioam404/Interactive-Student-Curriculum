package com.curriculum.auth.domain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

// Admin class that inherits from User 
@Entity
@DiscriminatorValue("Admin")
public class Admin extends User {

  public Admin() {
    super();
  }

  public Admin(String fullName, String email, String passwordHash) {
    super(fullName, email, passwordHash, null);
  }

  @Override
  public Role getRole() {
    return Role.ADMIN;
  }
}
