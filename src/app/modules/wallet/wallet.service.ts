import { PrismaClient } from '@prisma/client';
import { ITopUpInput } from './wallet.interface';
import ErrorFormat from '../../errors/ErrorFormat';
import status from 'http-status';

const prisma = new PrismaClient();

const getWalletBalanceFromDB = async (userId: number, userIdFromToken: number) => {
  if (userId != userIdFromToken) {
    throw new ErrorFormat(status.UNAUTHORIZED, 'You are not authorized.')
  }

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new ErrorFormat(status.NOT_FOUND, 'Wallet not found');
  }

  return {
    id: wallet.id,
    balance: wallet.balance,
  };
};

const topUpWalletIntoDB = async (userId: number, payload: ITopUpInput) => {
  const { amount } = payload;

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new ErrorFormat(status.NOT_FOUND, 'Wallet not found');
  }

  // Perform wallet top-up and transaction logging in a transaction
  const updatedWallet = await prisma.$transaction(async (tx) => {
    const walletUpdate = await tx.wallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    });

    await tx.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        type: 'TOP_UP',
        amount,
      },
    });

    return walletUpdate;
  });

  return {
    id: updatedWallet.id,
    balance: updatedWallet.balance,
  };
};

export const WalletService = {
  getWalletBalanceFromDB,
  topUpWalletIntoDB,
};