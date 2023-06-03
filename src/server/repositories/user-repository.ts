import { Prisma, Role, User, UserRole } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<
    | (User & {
        UserRole: UserRole[];
      })
    | null
  >;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findByIdUserAndCheckIfAdmin(id: string): Promise<any | null>;
}
