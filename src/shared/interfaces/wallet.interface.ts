import { Generated } from 'kysely';

export interface WalletTable {
  id: Generated<number>;
  balance: number;
  currency?: string;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}
