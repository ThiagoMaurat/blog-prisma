import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<
    | (User & {
        UserRole: ({
          role: {
            name: string;
          };
        } & {
          userId: string;
          roleId: string;
        })[];
      })
    | null
  >;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  findByIdUserAndCheckIfAdmin(id: string): Promise<any | null>;
  findUserAndCheckTheEmailCode(
    code: string,
    email: string
  ): Promise<User | null>;
  updateUser(data: Prisma.UserUpdateInput, id: string): Promise<User | null>;
}
