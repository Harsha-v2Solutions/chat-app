import { type Request, type Response } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';
import type { UserAttributes } from '../types/user.types';
import { formatError } from '../utils/error-handler.util';
import * as registrationsService from '../services/registrations.service';

export const create = async (
  req: Request<ParamsDictionary, object, UserAttributes>,
  res: Response
): Promise<void> => {
  try {
    const { email, firstName, lastName, uniqueId, password } = req.body;
    await registrationsService.registerUser({
      email,
      firstName,
      lastName,
      uniqueId,
      password,
    });
    res.json({ message: 'User Registered successfully' });
  } catch (error: unknown) {
    const { status, body } = formatError(error);
    res.status(status).json(body);
  }
};
