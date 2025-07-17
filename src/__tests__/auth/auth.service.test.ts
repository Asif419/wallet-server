import { AuthServices } from '../../../src/app/modules/auth/auth.service';
import prisma from '../../../src/app/config/prisma';
import bcrypt from 'bcrypt';
import { createToken } from '../../../src/app/modules/auth/auth.utils';

jest.mock('../../../src/app/config/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcrypt');
jest.mock('../../../src/app/modules/auth/auth.utils', () => ({
  createToken: jest.fn(),
}));

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    const mockInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockHashedPassword = 'hashedPassword';
    const mockUser = {
      id: 1,
      email: mockInput.email,
      wallet: {
        id: 10,
        balance: 0,
      },
    };

    it('should create user and return accessToken', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (createToken as jest.Mock).mockReturnValue('mocked.jwt.token');

      const result = await AuthServices.registerUser(mockInput as any);

      expect(result).toHaveProperty('accessToken', 'mocked.jwt.token');
      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        wallet: {
          id: mockUser.wallet.id,
          balance: mockUser.wallet.balance,
        },
      });
    });

    it('should throw error if user already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(AuthServices.registerUser(mockInput as any)).rejects.toThrow(
        'User already exists with this email'
      );
    });
  });

  describe('loginUser', () => {
    const mockInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 1,
      email: mockInput.email,
      password: 'hashedPassword',
      wallet: {
        id: 10,
        balance: 50,
      },
    };

    it('should return accessToken if credentials are correct', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (createToken as jest.Mock).mockReturnValue('mocked.jwt.token');

      const result = await AuthServices.loginUser(mockInput);

      expect(result).toHaveProperty('accessToken', 'mocked.jwt.token');
      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        wallet: {
          id: mockUser.wallet.id,
          balance: mockUser.wallet.balance,
        },
      });
    });

    it('should throw error if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(AuthServices.loginUser(mockInput)).rejects.toThrow(
        'User not found'
      );
    });

    it('should throw error if password is invalid', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(AuthServices.loginUser(mockInput)).rejects.toThrow(
        'Invalid password'
      );
    });
  });
});