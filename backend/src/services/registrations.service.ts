import { User } from '../models';
import type { UserAttributes } from '../types/user.types';

export async function registerUser(
  data: Pick<
    UserAttributes,
    'email' | 'firstName' | 'lastName' | 'uniqueId' | 'password'
  >
): Promise<void> {
  await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    uniqueId: data.uniqueId,
    password: data.password,
  });
}
