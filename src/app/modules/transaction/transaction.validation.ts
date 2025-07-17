import { z } from 'zod';

const createTransactionZodSchema = z.object({
  body: z.object({
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .positive('Amount must be a positive number'),

    type: z.enum(['DEPOSIT', 'WITHDRAW'], {
      required_error: 'Transaction type is required',
      invalid_type_error: 'Type must be DEPOSIT or WITHDRAW',
    }),
  }),
});

export const TransactionValidation = {
  createTransactionZodSchema,
};