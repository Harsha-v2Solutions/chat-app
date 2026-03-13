import { type Request, type Response } from 'express';
import { type UserAttributes, type Params } from '../types/user.types';
import { formatError } from '../utils/error-handler.util';
import * as usersService from '../services/users.service';

export const list = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await usersService.getUsers();
    res.json(result);
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
};

export const update = async (
  req: Request<Params, object, UserAttributes>,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const { email, firstName, lastName, uniqueId, password } = req.body;
    const updatedData = await usersService.updateUser(id, {
      email,
      firstName,
      lastName,
      uniqueId,
      password,
    });

    if (!updatedData) {
      res.status(404).json({ message: 'user with given id not found' });
      return;
    }

    res.status(200).json(updatedData.toJSON());
  } catch (error: unknown) {
    const { status, body } = formatError(error);
    res.status(status).json(body);
  }
};

export const remove = async (
  req: Request<Params>,
  res: Response
): Promise<void> => {
  try {
    const deleted = await usersService.deleteUser(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'user with given id not found' });
      return;
    }
    res.status(200).json();
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
};
