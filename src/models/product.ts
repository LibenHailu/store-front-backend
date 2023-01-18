// @ts-ignore
import client from "../database";

export type Product = {
  id?: Number;
  name: string;
  price: Number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async update(id: string, p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";
      const result = await conn.query(sql, [p.name, p.price, p.category, id]);
      const updatedProduct = result.rows[0];
      conn.release();
      return updatedProduct;
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
