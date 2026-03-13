export interface UserAttributes {
  id: bigint;
  email: string;
  firstName: string;
  lastName: string;
  uniqueId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Params {
  id: string;
  [key: string]: string;
}

export interface GetUsersQuery {
  page?: string;
  limit?: string;
}
