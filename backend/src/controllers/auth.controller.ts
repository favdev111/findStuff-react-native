import { Request, Response } from "express";
import mongodb from "mongodb";
import User from "../models/User";
import Room from "../models/Room";
import Otp from "../models/Otp";
import {
  signupValidation,
  signinValidation,
  registerValidation,
  loginValidation
} from "../libs/joi";
import jwt from "jsonwebtoken";

import moment from "moment";
import Admin from "../models/Admin";

const SESSION_TIME = 60 * 60 * 60;

class AuthController {
  constructor() {}

  public async signup(req: Request, res: Response) {
    // body request validation
    // const { error } = signupValidation(req.body);
    // if (error)
    //   return res.status(200).json({ success: true, msg: error.message });

    // username validation
    // const usernameExist = await User.findOne({ username: req.body.username });
    // if (usernameExist)
    //   return res.status(400).json({ msg: "Username already exist." });

    // const { name, email, username, password } = req.body;
    const { phone, password, otp } = req.body;

    if (!otp || otp === "")
      return res.status(200).json({ success: true, msg: "没有输入验证码" });

    console.log(otp, "otp from user input");

    const otpExist = await Otp.findOne({ phone, otp });

    console.log(otpExist, "otpExist");

    if (!otpExist)
      return res.status(200).json({ success: false, msg: "输入验证码错误" });

    try {
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
          expiresIn: SESSION_TIME
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "成功!",
          user: newUser
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "失败了"
      });
    }
  }

  public async resetpwd(req: Request, res: Response) {
    const { phone, password, otp } = req.body;

    if (!otp || otp === "")
      return res.status(200).json({ success: true, msg: "没有输入验证码" });

    console.log(otp, "otp from user input");

    const otpExist = await Otp.findOne({ phone, otp });

    console.log(otpExist, "otpExist");

    if (!otpExist)
      return res.status(200).json({ success: false, msg: "输入验证码错误" });

    try {
      const updatedUser = await User.findOneAndUpdate(
        { phone },
        { password },
        {
          new: true
        }
      );

      const token: string = jwt.sign(
        { _id: "" },
        process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
        {
          expiresIn: SESSION_TIME
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "成功!",
          user: updatedUser
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "失败了"
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

    const rooms = await Room.find({
      users: { $in: [new mongodb.ObjectID(user._id)] } //$elemMatch:{$eq:ObjectId("5e2916615f55cc6e3cb9838b")}
    });

    // create token
    const token: string = jwt.sign(
      { _id: user._id },
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
      {
        expiresIn: SESSION_TIME
      }
    );

    res
      .status(200)
      .header("auth_token", token)
      .json({
        success: true,
        msg: "Sign in success.",
        user,
        rooms
      });
  }

  public async otp(req: Request, res: Response) {
    // body request validation

    console.log(req.body);

    const { phone } = req.body;

    if (!phone) return res.status(200).json({ success: false, msg: "错号码." });

    ///////////////////////////////////////////////////

    let IHuyi = require("ihuyi106");

    let apiId = "C49435409";
    let apiKey = "566307019bd9d17ce6c7686c4f876780"; // international api key, if exist

    // apiKey is optional
    let iHuyi = new IHuyi(apiId, apiKey);
    let otp_code = Math.floor(1000 + Math.random() * 9000);

    const today = moment().startOf("day");
    let newOtp = await Otp.findOneAndUpdate(
      {
        phone,
        createAt: today.toDate()
      },
      { phone, otp: otp_code, $inc: { limit: -1 } },
      {
        new: true
      }
    );

    if (newOtp === null) {
      newOtp = new Otp({
        phone,
        otp: otp_code,
        createAt: today.toDate(),
        limit: 3
      });
      await newOtp.save();
    }

    console.log(newOtp.limit, "asdfa");

    if (newOtp.limit < 1) {
      res.status(200).json({
        success: false,
        msg: "一天可能只有3次!"
      });
      return;
    }

    let content =
      "您的验证码是：" + otp_code + "。请不要把验证码泄露给其他人。";

    console.log("will send to the IHuyi...", content);

    iHuyi.send(phone, content, function(err, smsId) {
      if (err) {
        console.log("err occured during otp...", err.message, err.code);
        res.status(200).json({
          success: false,
          msg: "正在发送验证码...." //err.message
        });
      } else {
        console.log("SMS sent, and smsId is " + smsId);
        res.status(200).json({
          success: true,
          msg: "我们发送给您验证码"
        });
      }
    });

    ///////////////////////////////////////////////////
  }

  public async device(req: Request, res: Response) {
    try {
      console.log("device token request from the cient...", req.body);
      const { user_id, device } = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        { device },
        {
          new: true
        }
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
      res.status(200).json({
        success: false,
        msg: "User not updated"
      });
    }
  }

  //admin register
  public async register(req: Request, res: Response) {
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(200).json({ success: false, msg: error.message });

    const { phone, password } = req.body;

    const usernameExist = await Admin.findOne({ phone });
    console.log(usernameExist);

    if (usernameExist)
      return res
        .status(200)
        .json({ success: false, msg: "Phonenumber already exist." });

    try {
      const newAdmin = new Admin({ phone, password });
      await newAdmin.save();

      const token: string = jwt.sign(
        { _id: newAdmin._id },
        process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
        {
          expiresIn: SESSION_TIME
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "User saved.",
          user: newAdmin
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(200).json({
        success: false,
        msg: "User not saved"
      });
    }
  }

  //admin login
  public async login(req: Request, res: Response) {
    const { phone, password } = req.body;
    const { error } = loginValidation({ phone, password });

    const admin = await Admin.findOne({
      phone,
      password
    });

    if (!admin)
      return res.status(200).json({ success: false, msg: "找不到用户." });

    const token: string = jwt.sign(
      { _id: admin._id },
      process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
      {
        expiresIn: SESSION_TIME
      }
    );

    console.log("Token to the client...", token);

    res
      .status(200)
      // .header("auth_token", token)
      .json({
        auth_token: token,
        success: true,
        msg: "Sign in success.",
        user: admin
      });
  }

  public async resetpass(req: Request, res: Response) {
    const { phone, password, otp } = req.body;

    if (!otp || otp === "")
      return res.status(200).json({ success: true, msg: "没有输入验证码" });

    console.log(otp, "otp from user input");

    const otpExist = await Otp.findOne({ phone, otp });

    console.log(otpExist, "otpExist");

    if (!otpExist)
      return res.status(200).json({ success: false, msg: "输入验证码错误" });

    try {
      const updatedUser = await Admin.findOneAndUpdate(
        { phone },
        { password },
        {
          new: true
        }
      );

      const token: string = jwt.sign(
        { _id: "" },
        process.env["TOKEN_SECRET"] || "MyS3cr3tT0k3n",
        {
          expiresIn: SESSION_TIME
        }
      );

      res
        .status(200)
        .header("auth_token", token)
        .json({
          success: true,
          msg: "成功!",
          user: updatedUser
        });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "失败了"
      });
    }
  }
}

export default new AuthController();
