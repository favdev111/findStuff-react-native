import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
  _id: string;
  iat: number;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("auth_token");

    if (!token) return res.status(401).json("Access Denied");
    const payload = jwt.verify(
      token,
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n"
    ) as IPayload;
    req.userId = payload._id;

    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("Invalid Token");
  }
};
