import { CreateWalletDTO } from './../dtos/wallet.dto';
import { db } from '../database';
import AppError from '../shared/utils/AppError';
import dateCreated from '../shared/utils/helper';
import { WalletTable } from 'shared/interfaces/wallet.interface';
import { SimpleConsoleLogger } from 'typeorm';

export async function getByUserId(user_id: number) {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .where('userId', '=', user_id)
    .select(['id', 'userId', 'balance'])
    .executeTakeFirst();
  if (!wallet) {
    throw new AppError('Wallet not found', 404);
  }

  return wallet;
}

export const createWallet = async (userId: number) => {
  const date = dateCreated();
  const result = await db
    .insertInto('wallet.Wallet')
    .values({ userId, balance: 0.0, createdAt: date, updatedAt: date })
    .returning(['id', 'userId', 'balance', 'createdAt'])
    .executeTakeFirst();

  return result;
};

export const chargeWallet = async (
  wallet_id: number,
  amount: number,
  user_id: number,
) => {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .selectAll()
    .where('id', '=', wallet_id)
    .where('wallet.Wallet.userId', '=', user_id)
    .executeTakeFirst();

  console.log('waller_id', wallet_id);
  if (!wallet) {
    throw new AppError('Wallet not found or user does not exist', 404);
  }

  if (amount > wallet.balance) {
    throw new AppError('Insufficient balance', 402);
  }
  const newBalance = wallet.balance - amount;

  const chargeWallet = await db
    .updateTable('wallet.Wallet')
    .set({ balance: newBalance })
    .where('id', '=', wallet_id)
    .returning(['userId', 'balance'])
    .execute();

  return chargeWallet;
};

export const deleteWallet = async (wallet_id: number, user_id: number) => {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .selectAll()
    .where('id', '=', wallet_id)
    .where('wallet.Wallet.userId', '=', user_id)
    .executeTakeFirst();

  if (!wallet) {
    throw new AppError('Wallet not found or does not belong to the user', 404);
  }

  await db
    .deleteFrom('wallet.Wallet')
    .where('id', '=', wallet_id)
    .where('wallet.Wallet.userId', '=', user_id)
    .execute();
};

export const fundWallet = async (
  wallet_id: number,
  amount: number,
  user_id: number,
) => {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .selectAll()
    .where('id', '=', wallet_id)
    .where('wallet.Wallet.userId', '=', user_id)
    .executeTakeFirst();

  if (!wallet) {
    throw new AppError('Wallet not found or does not belong to the user', 404);
  }
  const newBalance = wallet.balance + amount;
  console.log(newBalance);

  const fundWallet = await db
    .updateTable('wallet.Wallet')
    .set({ balance: newBalance })
    .where('id', '=', wallet_id)
    .returning(['userId', 'balance'])
    .execute();

  return fundWallet;
};

const walletService = {
  getByUserId,
  createWallet,
  chargeWallet,
  fundWallet,
  deleteWallet,
};

export default walletService;
