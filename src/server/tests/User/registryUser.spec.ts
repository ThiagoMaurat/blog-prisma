import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { InMemoryUserRepository } from "@/server/repositories/in-memory/users-repository";
import { RegisterUseCase } from "@/server/use-cases/Users/RegistryUser";
import { compare } from "bcryptjs";
import { describe, beforeEach, it, expect } from "vitest";

let userRepository: InMemoryUserRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("should be able to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashes = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashes).toBe(true);
  });

  it("should throw an error if user already exists", async () => {
    await registerUseCase.execute({
      name: "John Doe",
      email: "XXXXXXXXXXXXXXXXXXX",
      password: "XXXXXX",
    });

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        email: "XXXXXXXXXXXXXXXXXXX",
        password: "XXXXXX",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
