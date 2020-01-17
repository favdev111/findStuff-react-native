import { Request, Response } from "express";
import FoundPost from "../models/FoundPost";
import mongodb from "mongodb";

class FoundPostController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const tag = req.query.tag;
    const key = req.query.key;

    let filter = {};

    if (tag !== undefined && tag !== "") filter = { ...filter, tag };
    if (key !== undefined && key !== "")
      filter = { ...filter, $text: { $search: key } };

    console.log(filter);

    await FoundPost.createIndexes();

    const items = await FoundPost.find(filter);
    res.json(items);
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const item = await FoundPost.findOne({
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
      const { user, tag, place, address, description, photos } = req.body;

      const newItem = new FoundPost({
        user: new mongodb.ObjectID(user),
        tag,
        place,
        address,
        description,
        photos
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
      const updatedItem = await FoundPost.findOneAndUpdate(
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
      const deletedItem = await FoundPost.findOneAndDelete(
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

  public async increaseBrowseCnt(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedItem = await FoundPost.findOneAndUpdate(
        { _id: new mongodb.ObjectID(url) },
        { $inc: { browse: 1 } },
        {}
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
}

export default new FoundPostController();
