import { Insertable, Selectable, Updateable } from 'kysely';
import { UserTable } from './shared/interfaces/user.interface';
import { WalletTable } from './shared/interfaces/wallet.interface';

export interface Database {
  'wallet.User': UserTable;
  'wallet.Wallet': WalletTable;
}

export type User = Selectable<UserTable>;
export type CreateUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
export type Wallet = Selectable<WalletTable>;
export type CreateWallet = Insertable<WalletTable>;
export type UpdateWallet = Updateable<WalletTable>;
