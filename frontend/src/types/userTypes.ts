export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  uniqueId: string;
}

export type NewUser = Omit<User, "id">;
