import { ValidationError } from 'sequelize';

interface ValidationErrorResponse {
  status: number;
  body: {
    errors: { field: string; message: string }[];
  };
}

interface GenericErrorResponse {
  status: number;
  body: { error: unknown };
}

type ErrorResponse = ValidationErrorResponse | GenericErrorResponse;

export function formatError(error: unknown): ErrorResponse {
  if (error instanceof ValidationError) {
    return {
      status: 422,
      body: {
        errors: error.errors.map((err) => ({
          field: String(err.path),
          message: err.message,
        })),
      },
    };
  }
  return {
    status: 500,
    body: {
      error: {
        message: 'Internal Server Error',
      },
    },
  };
}
