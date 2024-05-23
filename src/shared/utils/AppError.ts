class AppError extends Error {
  statusCode: number;
  status: string;
  message: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super();

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
