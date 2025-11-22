
package com.curriculum.auth.domain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

// Class Student that inherits from User 
@Entity
@DiscriminatorValue("Student")
public class Student extends User {

  public Student() {
    super();
  }

  public Student(String fullName, String email, String passwordHash, String programCode) {
    super(fullName, email, passwordHash, programCode);
  }

  @Override
  public Role getRole() {
    return Role.STUDENT;
  }
}
