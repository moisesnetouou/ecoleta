import path from 'path';

module.exports = {
  client: 'pg',
  connection: {
    //filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    host: '172.17.0.2',
    port: 5432,
    user: 'postgres',
    password: 'tigadark',
    database: 'postgres'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true
}