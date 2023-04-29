import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/server/repositories/in-memory/users-repository";
import { AuthenticateUseCase } from "@/server/use-cases/Authenticate/Authenticate";
import { InvalidCredentialsError } from "@/server/errors/invalid-credentials-error";

let userRepository: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateUseCase = new AuthenticateUseCase(userRepository);
  });

  it("should be able to authenticate", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    expect(
      async () =>
        await authenticateUseCase.execute({
          email: "johndoe@example.com",
          password: "12345",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
