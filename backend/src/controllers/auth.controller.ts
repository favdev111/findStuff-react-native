import { Request, Response } from "express";
import User from "../models/User";
import Otp from "../models/Otp";
import { signupValidation, signinValidation } from "../libs/joi";
import jwt from "jsonwebtoken";

import moment from "moment";

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
          expiresIn: 60 * 60 * 24
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
          expiresIn: 60 * 60 * 24
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

  public async otp(req: Request, res: Response) {
    // body request validation

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

    if (newOtp.limit < 0) {
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
