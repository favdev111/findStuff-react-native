import { Request, Response } from "express";
import User from "../models/User";
import { signupValidation } from "../libs/joi";
import mongodb from "mongodb";
class UserController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.json(users);
  }

  public async getUser(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const user = await User.findOne({ _id });

      if (!user)
        return res.status(400).json({
          success: false,
          msg: "找不到用户"
        });

      res.status(200).json({
        success: true,
        msg: "User found",
        user
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(404).json({
        success: false,
        msg: "找不到用户."
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void | any> {
    // validation

    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // username validation
    const usernameExist = await User.findOne({ username: req.body.username });
    console.log(usernameExist);
    if (usernameExist)
      return res.status(400).json({ msg: "Username already exist." });

    try {
      // const { name, username, email, phone, password } = req.body;

      const { phone, password } = req.body;

      const newUser = new User({ phone, password });
      await newUser.save();

      res.status(200).json({
        success: true,
        msg: "User saved.",
        post: newUser
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not saved"
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    try {
      console.log("bbbbbbbb");
      const _id = req.params.id;
      const updatedUser = await User.findOneAndUpdate({ _id }, req.body, {
        new: true
      });

      if (!updatedUser)
        return res.status(400).json({
          success: false,
          msg: "User not updated"
        });

      res.status(200).json({
        success: true,
        msg: "User updated.",
        post: updatedUser
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not updated"
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const _id = req.params.id;
      const deletedUser = await User.findOneAndDelete({ _id }, req.body);

      if (!deletedUser)
        return res.status(400).json({
          success: false,
          msg: "User not deleted"
        });

      res.status(200).json({
        success: true,
        msg: "User deleted.",
        post: deletedUser
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not deleted"
      });
    }
  }
}

export default new UserController();
