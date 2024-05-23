import { NextFunction, Request, Response } from 'express';
import config from '../../core/config/config';
import AppError from './AppError';

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    return new AppError(err.detail, 400);
};

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleNetworkError = () => new AppError('Network error', 400);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('Error: ', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.app_env === 'production') {
        sendErrorDev(err, res);
    } else if (config.app_env === 'development') {
        let error = { ...err };

        if (error.name === 'CastError') error = handleCastErrorDB(err);
        if (error.code === '23505') error = handleDuplicateFieldsDB(err);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(err);
        if (error.code === 'ENOTFOUND') error = handleNetworkError();

        sendErrorProd(error, res);
    }
};

export default globalErrorHandler;
