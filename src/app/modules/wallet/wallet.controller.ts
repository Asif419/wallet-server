import { Request, Response } from 'express';
import { WalletService } from './wallet.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';


const getWalletBalance = catchAsync(async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const result = await WalletService.getWalletBalanceFromDB(userId, req.user.id);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Wallet fetched successfully',
        data: result,
    });
});


const topUpWallet = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const walletData = req.body;

    const result = await WalletService.topUpWalletIntoDB(userId, walletData);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Wallet updated successfully',
        data: result,
    });
});



export const WalletController = {
    getWalletBalance,
    topUpWallet,
};