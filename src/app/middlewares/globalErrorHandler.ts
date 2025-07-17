/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import config from '../config';
import handleZodError from '../errors/handleZodErrors';
import { TErrorSources } from '../interface/error';
import handlePrismaError from '../errors/handlePrismaErrors';
import ErrorFormat from '../errors/ErrorFormat';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        const simplified = handleZodError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;

        // Prisma known client errors
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const simplified = handlePrismaError(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Validation error from Prisma';
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    }
    else if (err instanceof ErrorFormat) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    }

    // Send response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default globalErrorHandler;