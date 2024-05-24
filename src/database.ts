import { Database } from './types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import config from './core/config/config';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.db_database,
    host: config.db_host,
    user: config.db_username,
    password: config.db_password,
    port: config.db_port as any,
    max: 10,
  }),
});

console.log(config);
export const db = new Kysely<Database>({
  dialect,
});
