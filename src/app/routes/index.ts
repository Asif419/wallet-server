import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { WalletRoutes } from '../modules/wallet/wallet.route';
import { TransactionRoutes } from '../modules/transaction/transaction.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/wallets',
    route: WalletRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
