import * as postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  host: 'localhost',
  port: 5432,
  database: 'interview-nest-test-db',
  username: 'postgres',
  password: 'postgres',
});

export default sql;
