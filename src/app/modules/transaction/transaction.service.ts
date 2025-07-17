import { PrismaClient } from '@prisma/client';
import ErrorFormat from '../../errors/ErrorFormat';
import status from 'http-status';
import { ITransaction } from './transaction.interface';

const prisma = new PrismaClient();

const createTransactionFromDB = async (payload: ITransaction) => {
  const { userId, walletId, type, amount } = payload;

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      walletId,
      type,
      amount,
    },
  });

  return transaction;
};

const getUserTransactionsFromDB = async (userId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!transactions.length) {
    throw new ErrorFormat(status.NOT_FOUND, 'No transactions found');
  }

  return transactions;
};

export const TransactionService = {
  createTransactionFromDB,
  getUserTransactionsFromDB,
};