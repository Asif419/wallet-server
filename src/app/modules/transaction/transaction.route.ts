/**
 * @swagger
 * /transactions/{userId}:
 *   get:
 *     summary: Get transaction history for a user (requires authentication)
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user whose transactions are being retrieved
 *     responses:
 *       200:
 *         description: A list of transaction history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       walletId:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       type:
 *                         type: string
 *                         enum: [TOP_UP, WITHDRAWAL]
 *                       amount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       403:
 *         description: Forbidden (userId mismatch)
 *       404:
 *         description: Transactions not found
 */

import express from 'express';
import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router.get('/:userId', auth(), TransactionController.getMyTransactions);

export const TransactionRoutes = router;