import { UserTable } from 'shared/interfaces/user.interface';
import { db } from '../database';
import dateCreated from '../shared/utils/helper';

export const createUser = async (
  username: string,
  email: string,
) => {
  const date = dateCreated();
  const result = await db
    .insertInto('wallet.User')
    .values({ username, email, createdAt: date, updatedAt: date })
    .returning(['id', 'username', 'email', 'createdAt'])
    .executeTakeFirst();

  return result;
};

const userService = {
  createUser,
};

export default userService;
