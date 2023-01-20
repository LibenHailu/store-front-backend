import { Product, ProductStore } from "../models/product";
import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const updatedProduct = await store.update(req.params.id, product);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destory = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", auth, create);
  app.put("/products/:id", auth, update);
  app.delete("/products/:id", auth, destory);
};

export default product_routes;
