"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe("Product model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
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
    it("create method should add a product", async () => {
        const result = await store.create({
            name: "car",
            price: 2000,
            category: "luxury",
        });
        expect(result).toEqual({
            id: 1,
            name: "car",
            price: 2000,
            category: "luxury",
        });
    });
    it("Show method should return the product with it's id", async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: "car",
            price: 2000,
            category: "luxury",
        });
    });
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: "car",
                price: 2000,
                category: "luxury",
            },
        ]);
    });
    it("delete method should remove a product", async () => {
        await store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
