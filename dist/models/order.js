"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
            const result = await conn.query(sql, [o.status, o.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order for user ${o.user_id}. Error: ${err}`);
        }
    }
    async update(id, o) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "UPDATE orders SET staus = $1, user_id = $2 WHERE id = $3 RETURNING *";
            const result = await conn.query(sql, [o.status, o.user_id, id]);
            const updatedOrder = result.rows[0];
            conn.release();
            return updatedOrder;
        }
        catch (err) {
            throw new Error(`Could not update order ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "DELETE * FROM orders WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
