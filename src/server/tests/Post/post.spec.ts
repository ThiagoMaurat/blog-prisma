import { UserAlreadyExistsError } from "@/server/errors/user-already-exists";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { InMemoryPostRepository } from "@/server/repositories/in-memory/post-repository";
import { InMemoryUserRepository } from "@/server/repositories/in-memory/users-repository";
import { PostUseCase } from "@/server/use-cases/Posts/post";
import { describe, beforeEach, it, expect } from "vitest";

let userRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let postUseCase: PostUseCase;

describe("Post Use Case", () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    inMemoryPostRepository = new InMemoryPostRepository(userRepository);
    postUseCase = new PostUseCase(inMemoryPostRepository, userRepository);
  });

  it("should be able to register a post", async () => {
    const user = await userRepository.create({
      id: "22",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    console.log(user);

    const { post } = await postUseCase.execute({
      authorId: "22",
      content: "Test in Typescript",
      title: "Typescript",
    });

    expect(post).toHaveProperty("id");
  });

  it("shouldnt be able to register a post if user doesn't exists", async () => {
    const user = await userRepository.create({
      id: "22",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(async () => {
      await postUseCase.execute({
        authorId: "23",
        content: "Test in Typescript",
        title: "Typescript",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
