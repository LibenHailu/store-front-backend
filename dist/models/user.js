"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
class UserStore {
    async create(u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + process.env.SALT, 10);
            const sql = "INSERT INTO users (firstname, lastname, email,password) VALUES($1, $2, $3,$4) RETURNING *";
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Unable create user (${u.firstname}): ${err}`);
        }
    }
    async authenticate(email, password) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = "SELECT * FROM users WHERE email=($1)";
        const result = await conn.query(sql, [email]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + process.env.SALT, user.password)) {
                return user;
            }
        }
        return null;
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async update(id, u) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5 RETURNING *";
            const hash = bcrypt_1.default.hashSync(u.password + process.env.SALT, 10);
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                hash,
                id,
            ]);
            const updatedUser = result.rows[0];
            conn.release();
            return updatedUser;
        }
        catch (err) {
            throw new Error(`Could not update user ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "DELETE * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
