export class InvalidEmailSentError extends Error {
  constructor() {
    super("Email inválido enviado");
  }
}
