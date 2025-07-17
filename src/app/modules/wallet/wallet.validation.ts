import { z } from 'zod';

const topUpWalletZodSchema = z.object({
    body: z.object({
        amount: z
            .number({
                required_error: 'Amount is required',
                invalid_type_error: 'Amount must be a number',
            })
            .positive('Amount must be a positive number'),
    }),
});

export const WalletValidation = {
    topUpWalletZodSchema,
};