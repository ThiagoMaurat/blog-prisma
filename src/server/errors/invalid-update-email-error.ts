export class InvalidUpdateUserEmailError extends Error {
  constructor() {
    super("Email a ser atualizado inválido");
  }
}
