/// <reference types="cypress" />

describe("testing my app to-do api", function () {
  beforeEach(function () {
    cy.visit("http://127.0.0.1:5500/src/index.html");
  });

  it("shows no tasks by default", function () {
    cy.get("#prep-list li").should("not.exist");
  });

  it("adds new tasks", function () {
    cy.get("#description");
    cy.get("#btn-add").click();
    cy.get("#prep-list li").last().contains("Learn Portugese");
  });

  it("adds no empty tasks ", function () {
    cy.get("#description").clear();
    cy.get("#btn-add").click();
    cy.get("#prep-list li").last().should("not.have.text", "");
  });

  it("shows checked tasks as done", function () {
    cy.get("#prep-filter-list #filter-option-done").check();
    cy.get("#prep-list li input").should("be.checked");
  });

  it("shows non-checked task as open", function () {
    cy.get("#prep-filter-list #filter-option-open").check();
    cy.get("#prep-list input").should("not.be.checked");
  });
});
