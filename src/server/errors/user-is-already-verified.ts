export class UserIsAlreadyVerifiedError extends Error {
  constructor() {
    super("Usuário já verificado");
  }
}
