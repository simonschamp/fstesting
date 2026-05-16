declare namespace Cypress {
  interface Chainable {
    deleteTestUser(username: string): Chainable<void>;
  }
}
