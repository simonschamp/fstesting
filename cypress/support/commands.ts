/*Cypress.Commands.add("deleteTestUser", (username: string) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:8000/api/test/user/${username}`,
    failOnStatusCode: false, // user may not exist yet
  });
});*/

Cypress.Commands.add("deleteTestUser", (username: string) => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:8000/user/${username}",
    body: { username },
    failOnStatusCode: false, // important: user may not exist yet
  });
});
