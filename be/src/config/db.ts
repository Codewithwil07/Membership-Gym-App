import mysql from "mysql2";
import dotenv from 'dotenv'

dotenv.config()

class Connection {
  private static instance: Connection;
  private pool;

  private constructor() {
    this.pool = mysql.createPool({
      user: process.env.user,
      host: process.env.host,
      database: process.env.database,
      password: process.env.password,
      port: 3306,
    });
    console.log("Database connected");
  }

  public static getConnection() {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public getPool() {
    return this.pool;
  }
}

const db = Connection.getConnection().getPool();

export default db;
