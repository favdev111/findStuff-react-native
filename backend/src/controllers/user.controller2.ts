import { Request, Response } from "express";
import User from "../models/User";
import { signupValidation } from "../libs/joi";
import mongodb from "mongodb";
class UserController2 {
  public async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const _id = req.params.id;

      console.log("params", req.params.id);
      console.log("request body", _id, req.body);

      const updatedUser = await User.findOneAndUpdate(
        { _id: new mongodb.ObjectID(_id) },
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser)
        return res.status(200).json({
          success: false,
          msg: "User not updated"
        });

      res.status(200).json({
        success: true,
        msg: "User updated.",
        user: updatedUser
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not updated"
      });
    }
  }
}

export default new UserController2();
