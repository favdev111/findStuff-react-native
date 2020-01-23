import { Request, Response } from "express";
import StuffPost from "../models/StuffPost";
import mongodb from "mongodb";

class StuffPostController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const tag = req.query.tag;
    const key = req.query.key;
    const region = req.query.region;
    const sort = req.query.sort;

    let filter = {};

    if (tag !== undefined && tag !== "") filter = { ...filter, tag };

    if (
      key !== undefined &&
      key !== "" &&
      (region === undefined || region === "")
    )
      filter = { ...filter, $text: { $search: key } };
    if (
      region !== undefined &&
      region !== "" &&
      (key === undefined || key === "")
    )
      filter = { ...filter, $text: { $search: region } };
    if (
      key !== undefined &&
      key !== "" &&
      region !== undefined &&
      region !== ""
    )
      filter = {
        ...filter,
        $text: { $search: "'" + key + " " + region + "'" }
      };

    console.log(sort, "sort");

    if (sort !== undefined && sort !== "" && parseInt(sort) === 2) {
      filter = { ...filter, ads: true };
    }

    const sortObj = parseInt(sort) === 1 ? { browse: -1 } : { _id: -1 };

    console.log(filter);
    console.log(sortObj);

    await StuffPost.createIndexes();

    let items = await StuffPost.find(filter)
      .populate("user", ["name", "phone", "photo"])
      .sort(sortObj);

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
    try {
      const {
        user,
        tag,
        place,
        address,
        kind,
        fee,
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
        description,
        photos,
        browse: 0,
        ads: false
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
