Feature: Student Login
  As a student
  I want to log into the curriculum system
  So that I can view my academic progress

  Background:
    Given the curriculum system is running
    And a student account exists with email "student@unal.edu.co" and password "password123"

  Scenario: Successful student login
    Given I am on the login page
    When I enter email "student@unal.edu.co"
    And I enter password "password123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see my curriculum grid

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter email "student@unal.edu.co"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Credenciales inválidas"
    And I should remain on the login page

  Scenario: Login validation for empty fields
    Given I am on the login page
    When I click the login button without entering credentials
    Then I should see validation errors
    And the login button should be disabled