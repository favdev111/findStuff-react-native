import { Request, Response } from "express";
import User from "../models/User";
import StuffPost from "../models/StuffPost";
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

      //////////////////////update post title////////////////////
      await StuffPost.update(
        { user: new mongodb.ObjectID(updatedUser._id) },
        { $set: { title: updatedUser.name } },
        { multi: true }
      );

      const tttt = await StuffPost.count({
        user: new mongodb.ObjectID(updatedUser._id)
      });
      console.log(tttt, updatedUser.name, "ttttttttttttttttttttttttttt");
      ////////////////////////////////////////////////////////
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not updated"
      });
    }
  }

  public async updateLocation(req: Request, res: Response): Promise<any> {
    try {
      console.log("params", req.params.id);
      console.log("request body", req.body);

      const { user_id, location } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { _id: new mongodb.ObjectID(user_id) },
        { $set: { location } },
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
