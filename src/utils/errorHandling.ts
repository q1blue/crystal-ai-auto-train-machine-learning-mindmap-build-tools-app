export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'warning' | 'error' = 'error'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 'API_ERROR');
  }
  
  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR');
}