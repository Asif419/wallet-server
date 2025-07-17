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
 *                 example: 100
 *     responses:
 *       200:
 *         description: Wallet updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wallets/{userId}:
 *   get:
 *     summary: Get wallet balance by user ID
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user whose wallet balance is being retrieved
 *     responses:
 *       200:
 *         description: Wallet balance retrieved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wallet not found
 */

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