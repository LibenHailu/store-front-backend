import { Order, OrderStore } from "../models/order";
import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const showByUserID = async (req: Request, res: Response) => {
  // @ts-ignore
  const order = await store.showByUserID(req.user.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const updatedOrder = await store.update(req.params.id, order);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destory = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const order_routes = (app: express.Application) => {
  app.get("/orders", auth, index);
  app.get("/orders/:id", auth, show);
  app.get("orders/me", auth, showByUserID);
  app.post("/orders", auth, create);
  app.delete("/orders/:id", auth, destory);
  app.put("/orders/:id", auth, update);
  app.post("/orders/:id/products", auth, addProduct);
};

export default order_routes;
