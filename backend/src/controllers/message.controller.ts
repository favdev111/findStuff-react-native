import { Request, Response } from "express";
import Message from "../models/Message";
import mongodb from "mongodb";

class MessageController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const key = req.query.key;

    let filter = {};

    if (key !== undefined && key !== "")
      filter = { ...filter, $text: { $search: key } };

    await Message.createIndexes();

    let items = await Message.find(filter).sort({ _id: -1 });

    res.json(items);
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const item = await Message.findOne({
        _id: new mongodb.ObjectID(url)
      }).populate("user");

      if (!item)
        return res.status(400).json({
          success: false,
          msg: "Item not found"
        });

      res.status(200).json({
        success: true,
        msg: "Item found",
        item: item
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
        content
      });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "Item saved.",
        item: newItem
      });

      req.io.emit("bg_message", content);
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
