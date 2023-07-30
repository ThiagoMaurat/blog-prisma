export class InvalidUpdateUserEmailError extends Error {
  constructor() {
    super("Invalid update email");
  }
}
