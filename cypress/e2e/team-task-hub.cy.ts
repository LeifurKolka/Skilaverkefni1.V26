describe("Team Task Hub", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.reload();
  });

  it("creates a project, adds a task, and marks it complete", () => {
    cy.contains("Create Project").should("exist");

    cy.get('[data-cy="project-name-input"]').type("Cypress Project");
    cy.get('[data-cy="project-description-input"]').type(
      "Project created during E2E test"
    );
    cy.get('[data-cy="add-project-button"]').click();

    cy.contains("Cypress Project").should("exist");

    cy.get('[data-cy="task-title-input"]').type("Cypress Task");
    cy.get('[data-cy="task-description-input"]').type(
      "Task created during E2E test"
    );
    cy.get('[data-cy="add-task-button"]').click();

    cy.contains("Cypress Task").should("exist");
    cy.contains("Task created during E2E test").should("exist");
    cy.contains("Incomplete").should("exist");

    cy.get('[data-cy="toggle-task-button"]').first().click();

    cy.contains("Completed").should("exist");
  });
});