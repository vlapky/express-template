export const errors = {
  GOOGLE_AUTH_ERROR: 'Google auth error',
  NOT_AUTH: 'Not authorized',
  CUSTOM_ERROR: 'Some error',
  INTERNAL: 'Internal error',
};

export class AppError extends Error {
  isOperational: boolean;

  constructor(message: string) {
    super(message);
    this.isOperational = true; // Устанавливаем это свойство для различения собственных ошибок от системных
    Error.captureStackTrace(this, this.constructor);
  }
}
