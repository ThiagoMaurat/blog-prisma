import { Prisma, Role, User, UserRole } from "@prisma/client";

export interface UserWithRoles extends User {
  roles: Role[];
}
export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByIdUserAndCheckIfAdmin(id: string): Promise<any | null>;
}
