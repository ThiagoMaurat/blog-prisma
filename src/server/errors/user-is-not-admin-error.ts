export class UserIsNotAdminError extends Error {
  constructor() {
    super("Usuário não é um administrador");
  }
}
