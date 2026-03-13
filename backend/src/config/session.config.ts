import session from 'express-session';

export function createSessionMiddleware(): ReturnType<typeof session> {
  return session({
    secret: String(process.env['SECRET_KEY']),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 20,
      httpOnly: true,
    },
  });
}
