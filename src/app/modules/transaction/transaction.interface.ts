export type TTransactionType = 'DEPOSIT' | 'WITHDRAW';

export interface ITransaction {
  id?: number;
  userId: number;
  walletId: number;
  type: TTransactionType;
  amount: number;
  createdAt?: Date;
}