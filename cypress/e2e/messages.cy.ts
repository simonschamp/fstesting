/// <reference types="cypress" />

describe("Register Page", () => {
  beforeEach(() => {
    //cy.deleteTestUser("testuser"); //Delete existing testUser
    cy.intercept("POST", "http://localhost:8000/user/register", {
      statusCode: 200,
      body: { message: "User registered" },
    }).as("register");

    cy.visit("/register");
  });
  /* -------------------- REGISTER -------------------- */
  it("registers a new user and redirects to login", () => {
    cy.get('[data-cy="username-input"]').type("testuser");
    cy.get('[data-cy="password-input"]').type("password123");

    cy.get('[data-cy="register-button"]').click();

    cy.wait("@register");

    cy.url().should("include", "/login");
  });
});

/* -------------------- LOGIN -------------------- */
it("logs in successfully (stubbed)", () => {
  cy.intercept("POST", "http://localhost:8000/user/login", {
    statusCode: 200,
    body: {
      token: "fake-jwt-token",
    },
  }).as("login");

  cy.visit("/login");

  cy.get('[data-cy="login-username"]').type("testuser");
  cy.get('[data-cy="login-password"]').type("password123");
  cy.get('[data-cy="login-button"]').click();

  cy.wait("@login");

  cy.window().then((win) => {
    expect(win.localStorage.getItem("token")).to.eq("fake-jwt-token");
  });

  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});

/* -------------------- MESSAGES APP -------------------- */
describe("Messages App - CRUD + Drag-and-Drop", () => {
  const baseUrl = "http://localhost:5173";
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:8000/api/messages/reset");
    cy.visit(`${baseUrl}/getforminput`);
  });

  it("can add a message", () => {
    cy.get('input[placeholder="Enter title..."]').type("Test Title");
    cy.get('textarea[placeholder="Enter message..."]').type("Test Content");
    cy.contains("Submit Message").click();

    cy.get(".ul-style li").should("have.length", 1);
    cy.contains("Test Title");
    cy.contains("Test Content");
  });

  it("can edit a message", () => {
    // Add first
    cy.get('input[placeholder="Enter title..."]').type("Original");
    cy.get('textarea[placeholder="Enter message..."]').type("Original content");
    cy.contains("Submit Message").click();

    cy.get(".message-item")
      .first()
      .within(() => {
        cy.contains("Edit").click();
        cy.get("input").clear().type("Test 1");
        cy.contains("Save").click();
        cy.contains("Test 1").should("exist");
      });
  });

  it("can delete a message", () => {
    cy.get('input[placeholder="Enter title..."]').type("To Delete");
    cy.get('textarea[placeholder="Enter message..."]').type("Delete Content");
    cy.contains("Submit Message").click();

    cy.contains("❌ Delete").click();
    cy.get(".ul-style li").should("have.length", 0);
  });
});

/* -------------------- Testing the Post API -------------------- */
describe("Posts Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
      statusCode: 200,
      body: [
        {
          userId: 1,
          id: 1,
          title: "Test Post 1",
          body: "This is the first test post",
        },
        {
          userId: 1,
          id: 2,
          title: "Test Post 2",
          body: "This is the second test post",
        },
      ],
    }).as("getPosts");

    cy.visit("/posts"); // route where <Posts /> is rendered
  });

  it("shows loading state", () => {
    cy.contains("Loading...").should("exist");
  });

  it("renders posts after fetch", () => {
    cy.wait("@getPosts");

    cy.contains("Test Post 1").should("exist");
    cy.contains("This is the first test post").should("exist");

    cy.contains("Test Post 2").should("exist");
    cy.contains("This is the second test post").should("exist");
  });
});

/* -------------------- Testing the useEffectDemo -------------------- */

describe("UseEffectDemo", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
      statusCode: 200,
      body: [{ id: 1, title: "Post 1" }],
    }).as("getPosts");

    cy.intercept("GET", "https://jsonplaceholder.typicode.com/comments", {
      statusCode: 200,
      body: [{ id: 1, body: "Comment 1" }],
    }).as("getComments");

    cy.visit("/use-effect"); // route where component is rendered
  });

  it("fetches posts on initial render", () => {
    cy.wait("@getPosts");

    cy.contains("posts").should("exist");
    cy.contains('"title":"Post 1"').should("exist");
  });

  it("fetches comments when clicking Comments button", () => {
    cy.wait("@getPosts");

    cy.contains("Comments").click();

    cy.wait("@getComments");

    cy.contains("comments").should("exist");
    cy.contains('"body":"Comment 1"').should("exist");
  });

  it("switches back to posts when clicking Posts button", () => {
    cy.contains("Comments").click();
    cy.wait("@getComments");

    cy.contains("Posts").click();
    cy.wait("@getPosts");

    cy.contains("posts").should("exist");
  });
});
