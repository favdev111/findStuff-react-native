import { Request, Response } from "express";
import StuffPost from "../models/StuffPost";
import mongodb from "mongodb";

class StuffPostController2 {
  public async increaseBrowseCnt(req: Request, res: Response): Promise<any> {
    try {
      const { _id } = req.body;
      const updatedItem = await StuffPost.findOneAndUpdate(
        { _id: new mongodb.ObjectID(_id) },
        { $inc: { browse: 1 } },
        { new: true }
      ).populate("user", ["name", "phone", "photo"]);

      if (!updatedItem)
        return res.status(400).json({
          success: false,
          msg: "Item not updated"
        });

      res.status(200).json({
        success: true,
        msg: "Item updated.",
        item: updatedItem
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Item not updated"
      });
    }
  }

  public async increaseLikesCnt(req: Request, res: Response): Promise<any> {
    try {
      const { post_id, user_id } = req.body;

      console.log(post_id, user_id);

      const updatedItem = await StuffPost.findOneAndUpdate(
        { _id: new mongodb.ObjectID(post_id) },
        { $addToSet: { likes: user_id } },
        { new: true }
      ).populate("user", ["name", "phone", "photo"]);

      if (!updatedItem)
        return res.status(400).json({
          success: false,
          msg: "Item not updated"
        });

      res.status(200).json({
        success: true,
        msg: "Item updated.",
        item: updatedItem
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Item not updated"
      });
    }
  }
}

export default new StuffPostController2();
