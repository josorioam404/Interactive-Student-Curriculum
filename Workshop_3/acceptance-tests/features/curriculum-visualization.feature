Feature: Curriculum Visualization
  As a student
  I want to view my curriculum in an interactive grid
  So that I can understand my academic progress and plan future courses

  Background:
    Given I am logged in as a student
    And I have selected "Ingeniería de Sistemas" program

  Scenario: View curriculum grid with subject statuses
    Given I am on the dashboard page
    When I view the curriculum grid
    Then I should see subjects organized by semesters
    And completed subjects should be marked in green
    And available subjects should be marked in blue
    And locked subjects should be marked in gray
    And I should see prerequisite connections between subjects

  Scenario: View subject details
    Given I am viewing the curriculum grid
    When I click on "Matemáticas I" subject
    Then a modal should open with subject details
    And I should see the subject name, credits, and description
    And I should see my grade if the subject is completed
    And I should see prerequisites if any exist

  Scenario: Filter subjects by status
    Given I am viewing the curriculum grid
    When I select "Completed" filter
    Then only completed subjects should be visible
    When I select "Available" filter
    Then only available subjects should be visible
    When I select "All" filter
    Then all subjects should be visible