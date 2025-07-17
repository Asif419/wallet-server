import express from 'express';
import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.get('/', auth(), TransactionController.getMyTransactions);

export const TransactionRoutes = router;