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
      const hash = bcrypt.hashSync(u.password + process.env.SALT, 10);
      const sql =
        "INSERT INTO users (firstname, lastname, email,password) VALUES($1, $2, $3,$4) RETURNING *";
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hash as string,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable create user (${u.firstname}): ${err}`);
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

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async update(id: string, u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5 RETURNING *";
      const hash = bcrypt.hashSync(u.password + process.env.SALT, 10);
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hash as string,
        id,
      ]);
      const updatedUser = result.rows[0];
      conn.release();
      return updatedUser;
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
