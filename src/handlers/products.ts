import { Product, ProductStore } from "../models/product";
import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      url: req.body.url,
      description: req.body.description,
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
      url: req.body.url,
      description: req.body.description,
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
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", auth, create);
  app.put("/products/:id", auth, update);
  app.delete("/products/:id", auth, destory);
};

export default product_routes;
