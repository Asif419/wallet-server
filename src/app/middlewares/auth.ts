import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import ErrorFormat from '../errors/ErrorFormat';
import { PrismaClient } from '@prisma/client';
import catchAsync from '../utils/catchAsync';

const prisma = new PrismaClient();

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new ErrorFormat(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (err) {
      throw new ErrorFormat(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }

    const { userId } = decoded;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ErrorFormat(httpStatus.NOT_FOUND, 'User not found');
    }

    // Attach user info to request for downstream access
    req.user = { id: user.id, email: user.email };

    next();
  });
};

export default auth;