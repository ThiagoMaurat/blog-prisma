import { Prisma, Role, User, UserRole } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<
    | (User & {
        UserRole: UserRole[];
      })
    | null
  >;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByIdUserAndCheckIfAdmin(id: string): Promise<any | null>;
}
