import { Request, Response } from "express";
import StuffPost from "../models/StuffPost";
import mongodb from "mongodb";

import moment from "moment";
import StuffPostLimit from "../models/StuffPostLimit";

class StuffPostController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const tag = req.query.tag;
    const key = req.query.key;
    const kind = req.query.kind;
    const region = req.query.region;
    const sort = req.query.sort;

    let filter = {};

    if (tag !== undefined && tag !== "") filter = { ...filter, tag };
    if (kind !== undefined && kind !== "") filter = { ...filter, kind };

    if (key !== undefined && key !== "") {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: key, $options: "i" } },
          { description: { $regex: key, $options: "i" } }
        ]
      };
    }

    if (region !== undefined && region !== "")
      filter = { ...filter, place: { $regex: region, $options: "i" } };

    if (sort !== undefined && sort !== "" && parseInt(sort) === 0) {
      filter = { ...filter, ads: true };
    }

    const sortObj = parseInt(sort) === 1 ? { browse: -1 } : { _id: -1 };

    await StuffPost.createIndexes();

    let items = [];

    items = await StuffPost.find(filter).sort(sortObj);

    res.json(items);
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const item = await StuffPost.findOne({
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
    ///////////////////////////////////////////////////////////////////////
    const today = moment().startOf("day");
    let newStuffPostLimit = await StuffPostLimit.findOneAndUpdate(
      {
        user: req.body.user,
        createAt: today.toDate()
      },
      { $inc: { limit: -1 } },
      {
        new: true
      }
    );

    if (newStuffPostLimit === null) {
      newStuffPostLimit = new StuffPostLimit({
        user: req.body.user,
        createAt: today.toDate(),
        limit: 3
      });
      await newStuffPostLimit.save();
    }

    if (newStuffPostLimit.limit < 1) {
      res.status(200).json({
        success: false,
        msg: "一天可能只有3次!"
      });
      return;
    }
    /////////////////////////////////////////////

    try {
      const {
        user,
        tag,
        place,
        address,
        kind,
        fee,
        phone,
        title,
        description,
        photos
      } = req.body;

      const newItem = new StuffPost({
        user: new mongodb.ObjectID(user),
        tag,
        place,
        address,
        kind,
        fee,
        phone,
        title,
        description,
        photos,
        browse: 0,
        ads: false
      });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "成功!",
        item: newItem
      });
    } catch (err) {
      console.log("error => ", err);

      await StuffPostLimit.findOneAndUpdate(
        {
          user: req.body.user,
          createAt: today.toDate()
        },
        { $inc: { limit: 1 } },
        {
          new: true
        }
      );

      res.status(200).json({
        success: false,
        msg: "失败了!"
      });
    }
  }

  public async updateItem(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedItem = await StuffPost.findOneAndUpdate(
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
      const deletedItem = await StuffPost.findOneAndDelete(
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

export default new StuffPostController();
