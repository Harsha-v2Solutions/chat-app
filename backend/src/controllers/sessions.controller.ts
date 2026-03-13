import type { Request, Response, NextFunction, RequestHandler } from 'express';
import passport from 'passport';
import type { User } from '../models';

function create(req: Request, res: Response, next: NextFunction): void {
  (
    passport.authenticate(
      'local',
      (
        err: Error | null,
        user: User | null,
        info: { message: string }
      ): void => {
        if (err) {
          next(err);
          return;
        }
        if (!user) {
          res.status(401).json({ message: info.message });
          return;
        }
        req.logIn(user, (err: Error | null) => {
          if (err) {
            next(err);
            return;
          }
          res.json(user);
        });
      }
    ) as RequestHandler
  )(req, res, next);
}

function remove(req: Request, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated()) {
    res.status(200).json({ message: 'Already logged out' });
    return;
  }
  req.logout((err: Error | null) => {
    if (err) {
      next(err);
      return;
    }
    req.session.destroy((err: Error | null) => {
      if (err) {
        next(err);
        return;
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'logout successful' });
    });
  });
}

function get(req: Request, res: Response): void {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: 'Not logged in' });
  }
}

export { create, remove, get };
