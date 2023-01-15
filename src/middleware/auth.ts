import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // @ts-ignore
    req.user = decoded as User;
    next();
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
};

export default auth;
