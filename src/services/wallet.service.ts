import { Decimal } from '@prisma/client/runtime/library';
import { db } from '../database';
import AppError from '../shared/utils/AppError';
import dateCreated from '../shared/utils/helper';

const date = dateCreated();

export async function getByUserId(user_id: number) {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .where('userId', '=', user_id)
    .select(['id', 'userId', 'balance'])
    .executeTakeFirst();

  if (!wallet) {
    throw new AppError('Wallet or user not found', 404);
  }

  return wallet;
}

export const createWallet = async (user_id: number) => {
  const user = await getUserById(user_id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const result = await db
    .insertInto('wallet.Wallet')
    .values({
      userId: user_id,
      balance: 0,
      createdAt: date,
      updatedAt: date,
    })
    .returning(['id', 'userId', 'balance', 'createdAt'])
    .executeTakeFirst();

  return result;
};

export const chargeWallet = async (
  wallet_id: number,
  amount: number,
  user_id: number,
) => {
  const wallet = await getWalletById(wallet_id, user_id);

  if (!wallet) {
    throw new AppError('Wallet not found or user does not exist', 404);
  }

  const initialBalance = new Decimal(wallet.balance);
  const decimalAmount = new Decimal(amount);
  const newBalance = initialBalance.minus(decimalAmount);
  const updatedBalanceNumber = newBalance.toNumber();

  if (amount > wallet.balance) {
    throw new AppError('Insufficient balance', 402);
  }

  const updatedWallet = await db
    .updateTable('wallet.Wallet')
    .set({ balance: updatedBalanceNumber, updatedAt: date})
    .where('id', '=', wallet_id)
    .returning(['userId', 'balance'])
    .execute();

  return updatedWallet;
};

export const getBalance = async (wallet_id: number, user_id: number) => {
  const wallet = await getWalletById(wallet_id, user_id);

  if (!wallet) {
    throw new AppError('Wallet not found or user does not exist', 404);
  }

  return wallet.balance;
};

export const deleteWallet = async (wallet_id: number, user_id: number) => {
  const wallet = await getWalletById(wallet_id, user_id);

  if (!wallet) {
    throw new AppError('Wallet not found or does not belong to the user', 404);
  }

  await db
    .deleteFrom('wallet.Wallet')
    .where('id', '=', wallet_id)
    .where('userId', '=', user_id)
    .execute();
};

export const fundWallet = async (
  wallet_id: number,
  amount: number,
  user_id: number,
) => {
  const wallet = await getWalletById(wallet_id, user_id);

  if (!wallet) {
    throw new AppError('Wallet not found or does not belong to the user', 404);
  }
  const initialBalance = new Decimal(wallet.balance);
  const decimalAmount = new Decimal(amount);
  const newBalance = initialBalance.plus(decimalAmount);
  const updatedBalanceNumber = newBalance.toNumber();
  const updatedWallet = await db
    .updateTable('wallet.Wallet')
    .set({ balance: updatedBalanceNumber, updatedAt: date })
    .where('id', '=', wallet_id)
    .returning(['userId', 'balance'])
    .execute();

  return updatedWallet;
};

async function getWalletById(wallet_id: number, user_id: number) {
  const wallet = await db
    .selectFrom('wallet.Wallet')
    .selectAll()
    .where('id', '=', wallet_id)
    .where('userId', '=', user_id)
    .executeTakeFirst();

  return wallet;
}

async function getUserById(user_id: number) {
  const user = await db
    .selectFrom('wallet.User')
    .where('id', '=', user_id)
    .executeTakeFirst();

  return user;
}

const walletService = {
  getByUserId,
  createWallet,
  chargeWallet,
  fundWallet,
  deleteWallet,
  getBalance,
};

export default walletService;
