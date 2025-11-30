package com.curriculum.auth.application.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateProgramRequest {

  @NotBlank
  private String programCode;

  public UpdateProgramRequest() {
  }

  public UpdateProgramRequest(String programCode) {
    this.programCode = programCode;
  }

  public String getProgramCode() {
    return programCode;
  }

  public void setProgramCode(String programCode) {
    this.programCode = programCode;
  }
}
