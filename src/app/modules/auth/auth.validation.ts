import { z } from 'zod';

const registerZodSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({ message: 'Invalid email format' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
        role: z.enum(['user', 'admin']).optional(),
    }),
});

const loginZodSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email({ message: 'Invalid email format' }),
        password: z.string().min(1, { message: 'Password is required' }),
    }),
});

export const AuthValidation = {
    registerZodSchema,
    loginZodSchema
}