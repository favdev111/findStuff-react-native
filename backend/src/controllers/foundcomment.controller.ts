import { Request, Response } from "express";
import FoundComment from "../models/FoundComment";
import mongodb from "mongodb";

class FoundCommentController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const items = await FoundComment.find();
    res.json(items);
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const item = await FoundComment.findOne({
        _id: new mongodb.ObjectID(url)
      });

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
      const { user, post, content } = req.body;

      const newItem = new FoundComment({
        user,
        post,
        content
      });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "Item saved.",
        item: newItem
      });
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
      const updatedItem = await FoundComment.findOneAndUpdate(
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
      const deletedItem = await FoundComment.findOneAndDelete(
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

export default new FoundCommentController();
