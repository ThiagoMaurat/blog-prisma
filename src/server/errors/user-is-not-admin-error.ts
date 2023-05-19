export class UserIsNotAdminError extends Error {
  constructor() {
    super("User is not admin");
  }
}
