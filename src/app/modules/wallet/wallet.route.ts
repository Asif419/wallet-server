import express from 'express';
import { WalletController } from './wallet.controller';
import validateRequest from '../../middlewares/validateRequest';
import { WalletValidation } from './wallet.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.patch(
    '/top-up',
    validateRequest(WalletValidation.topUpWalletZodSchema),
    auth(),
    WalletController.topUpWallet
);

router.get('/:userId', auth(), WalletController.getWalletBalance);

export const WalletRoutes = router;