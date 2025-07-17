import { TransactionService } from '../../../src/app/modules/transaction/transaction.service';
import prisma from '../../../src/app/config/prisma';

jest.mock('../../../src/app/config/prisma', () => ({
  transaction: {
    findMany: jest.fn(),
  },
}));

describe('TransactionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionHistory', () => {
    it('should return transaction list for a user', async () => {
      const mockTransactions = [
        { id: 1, userId: 5, type: 'TOP_UP', amount: 100 },
        { id: 2, userId: 5, type: 'WITHDRAW', amount: 50 },
      ];

      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(mockTransactions);

      const result = await TransactionService.getUserTransactionsFromDB(5, 5);

      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { userId: 5 },
        orderBy: { createdAt: 'desc' },
      });

      expect(result).toEqual(mockTransactions);
    });
  });
});