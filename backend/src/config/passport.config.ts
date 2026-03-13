import passport from 'passport';
import { User } from '../models';
import localStrategy from './local-strategy.config';

export function configurePassport(): void {
  passport.use('local', localStrategy());

  passport.serializeUser((user, done) => {
    done(null, (user as User).id);
  });

  passport.deserializeUser((id: number, done) => {
    void (async (): Promise<void> => {
      try {
        const user = await User.findByPk(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    })();
  });
}
