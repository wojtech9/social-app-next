import { DataSource } from 'typeorm';
import { Users } from './models/Users';

const dbConnection = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  synchronize: true,
});

export default dbConnection;
