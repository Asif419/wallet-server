import bcrypt from 'bcrypt';
import { ILoginInput, IRegisterInput } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import status from 'http-status';
import ErrorFormat from '../../errors/ErrorFormat';


import prisma from '../../config/prisma';

const registerUser = async (payload: IRegisterInput) => {
  const { email, password} = payload;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ErrorFormat(status.CONFLICT, 'User already exists with this email');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user and wallet inside a transaction
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      wallet: {
        create: {
          balance: 0,
        },
      },
    },
    include: {
      wallet: true,
    },
  });

  // Generate JWT token
  const payloadofJWT = { userId: user.id, userEmail: user.email };
  const secret = config.jwt_access_secret as string;

  const token = createToken(payloadofJWT, secret);


  return {
    user: {
      id: user.id,
      email: user.email,
      wallet: {
        id: user.wallet?.id,
        balance: user.wallet?.balance,
      },
    },
    accessToken: token,
  };
};

const loginUser = async (payload: ILoginInput) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { wallet: true },
  });

  if (!user) {
    throw new ErrorFormat(status.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ErrorFormat(status.UNAUTHORIZED, 'Invalid password');
  }

  // Generate JWT token
  const payloadofJWT = { userId: user.id, userEmail: user.email };
  const secret = config.jwt_access_secret as string;
  
  const token = createToken(payloadofJWT, secret);

  return {
    user: {
      id: user.id,
      email: user.email,
      wallet: {
        id: user.wallet?.id,
        balance: user.wallet?.balance,
      },
    },
    accessToken: token,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
}