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
      const username = req.params.username;
      const user = await User.findOne({ username });

      if (!user)
        return res.status(400).json({
          success: false,
          msg: "User not found"
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
        msg: "User not found."
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
      const username = req.params.username;
      const updatedUser = await User.findOneAndUpdate({ username }, req.body, {
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
      const username = req.params.username;
      const deletedUser = await User.findOneAndDelete({ username }, req.body);

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
