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
    if (!token)
      return res.status(200).json({ success: false, msg: "Access Denied" });

    const payload = jwt.verify(
      token,
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n"
    ) as IPayload;

    req.userId = payload._id;

    next();
  } catch (e) {
    res.status(200).send({ success: false, msg: "Invalid Token" });
  }
};
