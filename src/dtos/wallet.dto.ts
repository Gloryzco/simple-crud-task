const { z } = require('zod');

export const ChargeWalletDTO = z.object({
  wallet_id: z.number({
    required_error: 'wallet id is required',
    invalid_type_error: 'wallet id must be a number',
  }),
  amount: z.number().positive({
    required_error: 'amount is required and must be a positive number',
    invalid_type_error: 'amount must be a positive number',
  }),
  user_id: z.number({
    required_error: 'user id is required',
    invalid_type_error: 'user id must be a number',
  }),
});

export const FundWalletDTO = z.object({
    wallet_id: z.number({
      required_error: 'wallet id is required',
      invalid_type_error: 'wallet id must be a number',
    }),
    amount: z.number().positive({
      required_error: 'amount is required and must be a positive number',
      invalid_type_error: 'amount must be a positive number',
    }),
    user_id: z.number({
      required_error: 'user id is required',
      invalid_type_error: 'user id must be a number',
    }),
  });
  

export const CreateWalletDTO = z.object({
  user_id: z.number({
    required_error: 'user id is required',
    invalid_type_error: 'user id must be a number',
  }),
});
