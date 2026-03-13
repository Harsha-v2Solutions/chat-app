import { User } from '../models';
import type { UserAttributes } from '../types/user.types';

// Return User[] by accessing .rows
export async function getUsers(): Promise<User[]> {
  const result = await User.findAll({
    attributes: ['id', 'email', 'firstName', 'lastName', 'uniqueId'],
  });
  return result;
}

export async function createUser(
  data: Pick<
    UserAttributes,
    'email' | 'firstName' | 'lastName' | 'uniqueId' | 'password'
  >
): Promise<User> {
  return User.create(
    {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      uniqueId: data.uniqueId,
      password: data.password,
    },
    { returning: true }
  );
}

export async function updateUser(
  id: string | number,
  data: Pick<
    UserAttributes,
    'email' | 'firstName' | 'lastName' | 'uniqueId' | 'password'
  >
): Promise<User | null> {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  return user.update(
    {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      uniqueId: data.uniqueId,
      password: data.password,
      updatedAt: new Date(),
    },
    { where: { id }, returning: true }
  );
}

export async function deleteUser(id: string | number): Promise<boolean> {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await user.destroy();
  return true;
}
