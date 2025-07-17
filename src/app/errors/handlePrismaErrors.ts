import { Prisma } from '@prisma/client';
import { TGenericErrorResponse } from '../interface/error';

const handlePrismaError = (
    err: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
    const statusCode = 409;
    const message = 'Duplicate entry';
    const errorSources = [
        {
            path: err.meta?.target?.toString() || '',
            message: 'Already exists',
        },
    ];

    return {
        statusCode,
        message,
        errorSources,
        stack: null,
    };
};

export default handlePrismaError;