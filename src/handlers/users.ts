import express, { Request, Response } from "express";
import { UserStore, User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

const user_routes = (app: express.Application) => {
  app.post("/users", create);
  app.post("/users/signin", authenticate);
};

export default user_routes;
