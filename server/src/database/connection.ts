import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'pg',
  connection: {
    //filename: path.resolve(__dirname, 'database.sqlite')
    host: '172.17.0.2',
    port: 5432,
    user: 'postgres',
    password: 'tigadark',
    database: 'postgres'
  },
  useNullAsDefault: true
})

export default connection;