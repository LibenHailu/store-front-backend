"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const store = new user_1.UserStore();
describe("User model", () => {
    it("should have authenticate method", () => {
        expect(store.authenticate).toBeDefined();
    });
    it("should have create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have an update method", () => {
        expect(store.update).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a user", async () => {
        const result = await store.create({
            firstname: "John",
            lastname: "Doe",
            email: "john@gmail.com",
            password: "john",
        });
        expect(result).toBeDefined();
    });
});
