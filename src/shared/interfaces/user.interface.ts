import { Generated } from 'kysely';

export interface UserTable {
  id: Generated<number>;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}
