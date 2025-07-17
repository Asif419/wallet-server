import { WalletService } from '../../../src/app/modules/wallet/wallet.service';
import prisma from '../../../src/app/config/prisma';

jest.mock('../../../src/app/config/prisma', () => ({
  wallet: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  transaction: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
}));

describe('WalletService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWalletBalanceFromDB', () => {
    it('should return wallet if userId is valid', async () => {
      const mockWallet = { id: 1, balance: 200 };
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);

      const result = await WalletService.getWalletBalanceFromDB(5, 5);

      expect(prisma.wallet.findUnique).toHaveBeenCalledWith({
        where: { userId: 5 },
      });
      expect(result).toEqual(mockWallet);
    });

    it('should throw forbidden error if userId does not match token', async () => {
      await expect(WalletService.getWalletBalanceFromDB(5, 6)).rejects.toThrow('You are not authorized.');
    });

    it('should throw error if wallet is not found', async () => {
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(WalletService.getWalletBalanceFromDB(5, 5)).rejects.toThrow('Wallet not found');
    });
  });
});