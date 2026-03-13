import { Strategy as LocalStrategy } from 'passport-local';
import argon2 from 'argon2';
import { User } from '../models';

export default function localStrategy(): LocalStrategy {
  return new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      void (async (): Promise<void> => {
        try {
          const user = await User.findOne({ where: { email: username } });
          if (!user) {
            done(null, false, { message: 'invalid credentials' });
            return;
          }

          const isValid = await argon2.verify(user.password, password);
          if (!isValid) {
            done(null, false, { message: 'invalid credentials' });
            return;
          }

          done(null, user);
          return;
        } catch (error) {
          done(error);
          return;
        }
      })();
    }
  );
}
