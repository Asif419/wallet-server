import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TransactionService } from './transaction.service';

const getMyTransactions = catchAsync(async (req: Request, res: Response) => {

  const userId = Number(req.params.userId);
  
  const result = await TransactionService.getUserTransactionsFromDB(userId, req.user?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction history retrieved successfully',
    data: result,
  });
});

export const TransactionController = {
  getMyTransactions,
};