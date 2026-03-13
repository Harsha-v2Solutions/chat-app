import express, {
  type Application,
  type Request,
  type Response,
  type Router,
} from 'express';
import { sequelize } from './models';
import passport from 'passport';
import { configurePassport } from './config/passport.config';
import { createSessionMiddleware } from './config/session.config';
import sessionRoutes from './routes/session.routes';
import registrationRoutes from './routes/registration.routes';
import userRoutes from './routes/user.routes';
import cors from 'cors';
import { createServer } from 'http';
import { initSocket } from './socket';

const app: Application = express();
const router: Router = express.Router();
const PORT = process.env['PORT'] ?? 4000;

// Middleware
app.use(
  cors({
    origin: process.env['CORS_URL'],
    credentials: true,
  })
);
app.use(express.json());

// socket
const httpServer = createServer(app);
initSocket(httpServer);

// Authentication
configurePassport();
app.use(createSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

// API v1 routes
router.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'Welcome to Ecom API v1' });
});

app.use('/api/v1', router);
app.use('/api/v1', sessionRoutes);
app.use('/api/v1', registrationRoutes);
app.use('/api/v1', userRoutes);

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection established successfully.');

    httpServer.listen(PORT, (): void => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${String(PORT)}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

void startServer();

export default app;
