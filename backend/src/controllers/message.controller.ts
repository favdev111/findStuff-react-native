import { Request, Response } from "express";
import mongodb from "mongodb";

import Message from "../models/Message";
import User from "../models/User";

class MessageController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const user_id = req.query.user_id;
    console.log("message list of ", user_id);
    if (!user_id) {
      res.json([]);
      return;
    }
    let filter = {
      $or: [
        // { sender: new mongodb.ObjectID(user_id) },
        { receiver: new mongodb.ObjectID(user_id) }
      ],
      checked: 0
    };

    let items = await Message.aggregate([
      {
        $match: filter
      },
      {
        $group: {
          _id: "$sender",
          total: { $sum: 1 },
          createAt: { $last: "$createAt" },
          content: { $last: "$content" }
        }
      }
    ]);

    let res_items = await User.populate(items, { path: "_id" });

    res.json(res_items);
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const user_id = req.query.user_id;

      const filter = {
        sender: new mongodb.ObjectID(url),
        receiver: new mongodb.ObjectID(user_id),
        checked: 0
      };

      console.log("get details filter... ... ...", filter);

      const items = await Message.find(filter);

      console.log("get message details.....", items);

      if (!items)
        return res.status(400).json({
          success: false,
          msg: "Item not found"
        });

      await Message.updateMany(filter, {
        $set: { checked: 1 }
      });

      res.status(200).json({
        success: true,
        msg: "Item found",
        items
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(404).json({
        success: false,
        msg: "Item not found."
      });
    }
  }

  public async createItem(req: Request, res: Response): Promise<void> {
    try {
      const { sender, receiver, content } = req.body;

      const newItem = new Message({
        sender: new mongodb.ObjectID(sender),
        receiver: new mongodb.ObjectID(receiver),
        content,
        checked: 0
      });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "Item saved.",
        item: newItem
      });

      req.io.emit(receiver, newItem);
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Item not saved"
      });
    }
  }

  public async updateItem(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedItem = await Message.findOneAndUpdate(
        { _id: new mongodb.ObjectID(url) },
        req.body,
        {
          new: true
        }
      );

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

  public async deleteItem(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const deletedItem = await Message.findOneAndDelete(
        { _id: new mongodb.ObjectID(url) },
        req.body
      );

      if (!deletedItem)
        return res.status(400).json({
          success: false,
          msg: "Item not deleted"
        });

      res.status(200).json({
        success: true,
        msg: "Item deleted.",
        item: deletedItem
      });
    } catch (err) {
      console.log("error => ", err);
      res.status(500).json({
        success: false,
        msg: "Item not deleted"
      });
    }
  }
}

export default new MessageController();
