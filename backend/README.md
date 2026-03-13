# Ecom API

A TypeScript Express.js API with PostgreSQL, Sequelize ORM, and strict linting.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Linting**: ESLint (strict type-checked rules)
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged

## Prerequisites

- Node.js >= 24
- PostgreSQL >= 14
- npm

## Development Setup

### 1. Clone and Install Dependencies

```bash
git clone git@github.com:manoj-v2/ecom-api.git
cd ecom-api
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your local settings:

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_development
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
```

### 3. Database Setup

Create the PostgreSQL database:

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE app_development;"

# Or using createdb
createdb -U postgres app_development
```

Run migrations:

```bash
npm run db:migrate
```

(Optional) Seed the database:

```bash
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot-reload enabled.

## Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot-reload |
| `npm run build`        | Compile TypeScript to JavaScript         |
| `npm start`            | Run compiled production build            |
| `npm run lint`         | Check for linting errors                 |
| `npm run lint:fix`     | Auto-fix linting errors                  |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run typecheck`    | Run TypeScript type checking             |

### Database Scripts

| Script                        | Description                              |
| ----------------------------- | ---------------------------------------- |
| `npm run db:migrate`          | Run pending migrations                   |
| `npm run db:migrate:undo`     | Undo last migration                      |
| `npm run db:migrate:undo:all` | Undo all migrations                      |
| `npm run db:seed`             | Run all seeders                          |
| `npm run db:seed:undo`        | Undo all seeders                         |
| `npm run db:reset`            | Reset database (undo all, migrate, seed) |

## Project Structure

```
src/
├── config/
│   ├── db.config.js     # Database configuration (used by Sequelize CLI)
│   └── database.ts      # Sequelize instance
├── migrations/          # Database migrations
├── models/
│   ├── index.ts         # Model exports and initialization
│   └── User.ts          # User model
├── seeders/             # Database seeders
└── index.ts             # Application entry point
```

## API Endpoints

Base path: `/api/v1`

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| GET    | `/health`       | Health check (root level) |
| GET    | `/api/v1/`      | Welcome message           |
| GET    | `/api/v1/users` | List all users            |
| POST   | `/api/v1/users` | Create a new user         |

## Creating Migrations

Generate a new migration:

```bash
npx sequelize-cli migration:generate --name create-table-name
```

Migrations are stored in `src/migrations/` as JavaScript files.

## Creating Models

1. Create a new file in `src/models/` (e.g., `Product.ts`)
2. Define the model class with TypeScript types
3. Export from `src/models/index.ts`
4. Create a corresponding migration

## Git Hooks

Pre-commit hooks automatically run:

- ESLint with auto-fix
- Prettier formatting

On staged `.ts` files before each commit.

## Production Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Run migrations:

   ```bash
   NODE_ENV=production npm run db:migrate
   ```

3. Start the server:
   ```bash
   NODE_ENV=production npm start
   ```

## Environment Variables

| Variable      | Description                               | Default         |
| ------------- | ----------------------------------------- | --------------- |
| `NODE_ENV`    | Environment (development/test/production) | development     |
| `PORT`        | Server port                               | 3000            |
| `DB_HOST`     | Database host                             | localhost       |
| `DB_PORT`     | Database port                             | 5432            |
| `DB_NAME`     | Database name                             | app_development |
| `DB_USER`     | Database user                             | postgres        |
| `DB_PASSWORD` | Database password                         | -               |
| `DB_DIALECT`  | Database dialect                          | postgres        |

## License

ISC
