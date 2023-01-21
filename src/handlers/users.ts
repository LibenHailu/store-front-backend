import express, { Request, Response } from "express";
import { UserStore, User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth } from "../middleware/auth";

dotenv.config();
const store = new UserStore();
const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    // @ts-ignore
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const u = await store.authenticate(email, password);
    // @ts-ignore
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const destory = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const deleted = await store.delete(req.user.id);
    res.json(deleted);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };
    // @ts-ignore
    const updated = await store.update(req.user.id, user);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.post("/users", create);
  app.post("/users/signin", authenticate);
  app.get("/users/:id", auth, show);
  app.get("/users", auth, index);
  app.put("/users", auth, update);
  app.delete("/users", auth, destory);
};

export default user_routes;
