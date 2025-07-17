import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { WalletRoutes } from '../modules/wallet/wallet.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
    {
    path: '/wallet',
    route: WalletRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
