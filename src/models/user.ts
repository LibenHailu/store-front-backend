// @ts-ignore
import client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
export type User = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *";

      const hash = bcrypt.hashSync(u.password + process.env.SALT, 10);
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hash,
      ]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.firstname}): ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE email=($1)";
    const result = await conn.query(sql, [email]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + process.env.SALT, user.password)) {
        return user;
      }
    }
    return null;
  }
}
