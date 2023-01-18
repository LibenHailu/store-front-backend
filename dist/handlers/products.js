"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const updatedProduct = await store.update(req.params.id, product);
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destory = async (req, res) => {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
};
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.put("/products/:id", update);
    app.delete("/products/:id", destory);
};
exports.default = product_routes;
