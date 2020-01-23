import { Request, Response } from "express";
import User from "../models/User";
import { signupValidation, signinValidation } from "../libs/joi";
import jwt from "jsonwebtoken";

class AuthController {
  constructor() {}

  public async signup(req: Request, res: Response) {
    // body request validation
    const { error } = signupValidation(req.body);

    if (error) return res.status(400).json(error.message);

    // username validation
    // const usernameExist = await User.findOne({ username: req.body.username });
    // if (usernameExist)
    //   return res.status(400).json({ msg: "Username already exist." });

    try {
      // const { name, email, username, password } = req.body;
      const { phone, password } = req.body;

      const newUser = new User({
        email: "test@test.com",
        photo: "",
        name: "",
        phone,
        password
      });
      await newUser.save();

      const token: string = jwt.sign(
        { _id: newUser._id },
        process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
        {
          expiresIn: 60 * 60 * 24
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "User saved.",
          user: newUser
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not saved"
      });
    }
  }

  public async signin(req: Request, res: Response) {
    // body request validation

    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // find user
    // const user = await User.findOne({ email: req.body.email });

    const user = await User.findOne({
      phone: req.body.phone,
      password: req.body.password
    });

    if (!user)
      return res.status(200).json({ success: false, msg: "找不到用户." });

    // create token
    const token: string = jwt.sign(
      { _id: user._id },
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
      {
        expiresIn: 60 * 60 * 24
      }
    );

    res
      .status(200)
      .header("auth_token", token)
      .json({
        success: true,
        msg: "Sign in success.",
        user: user
      });
  }

  public async register(req: Request, res: Response) {
    // body request validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // username validation
    const usernameExist = await User.findOne({ username: req.body.username });
    console.log(usernameExist);
    if (usernameExist)
      return res.status(400).json({ msg: "Username already exist." });

    try {
      // const { name, email, username, password } = req.body;
      const { phone, password } = req.body;

      const newUser = new User({ phone, password });
      await newUser.save();

      const token: string = jwt.sign(
        { _id: newUser._id },
        process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
        {
          expiresIn: 60 * 60 * 24
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "User saved.",
          user: newUser
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "User not saved"
      });
    }
  }

  public async login(req: Request, res: Response) {
    // body request validation

    const { email, password } = req.body;
    const { error } = signinValidation({ email, password, phone: "123456" });

    console.log(req.body);
    console.log(error);

    // if (error) return res.status(400).json(error.message);
    // find user

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user)
      return res.status(200).json({ success: false, msg: "找不到用户." });

    // create token
    const token: string = jwt.sign(
      { _id: user._id },
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
      {
        expiresIn: 60 * 60 * 24
      }
    );

    res
      .status(200)
      .header("auth_token", token)
      .json({
        success: true,
        msg: "Sign in success.",
        user: user
      });
  }
}

export default new AuthController();
