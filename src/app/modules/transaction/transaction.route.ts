/**
 * @swagger
 * /wallets/top-up:
 *   patch:
 *     summary: Top up wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet updated
 */

import express from 'express';
import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.get('/', auth(), TransactionController.getMyTransactions);

export const TransactionRoutes = router;