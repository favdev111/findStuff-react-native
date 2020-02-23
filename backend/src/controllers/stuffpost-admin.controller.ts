import { Request, Response } from "express";
import StuffPost from "../models/StuffPost";
import mongodb from "mongodb";

import moment from "moment";
import StuffPostLimit from "../models/StuffPostLimit";

class StuffPostController {
  public async getItems(req: Request, res: Response): Promise<void> {
    // const { page } = req.query;

    console.log(req.query);

    const { current = 1, pageSize = 10, report = false } = req.query;

    console.log("req.query......", req.query);
    console.log("page, size,,,,", current, pageSize, report);

    // let items = await StuffPost.paginate().populate("user", [
    //   "name",
    //   "phone",
    //   "photo"
    // ]);

    const options = {
      // select: "_id, user, place",
      sort: { createAt: -1 },
      page: Number(current),
      limit: Number(pageSize),
      populate: "user" //not sure how to set child field
    };

    let querys = {};
    // if (report) querys = { reports: { $gt: { $size: 0 } } };
    if (report) querys = { "reports.0": { $exists: true } };
    console.log("query...", querys);
    const result = await StuffPost.paginate(querys, options);

    console.log(result, "----");

    /**
    {
      docs:[],
      totalDocs: 11,
      limit: 5,
      totalPages: 3,
      page: 2,
      pagingCounter: 6,
      hasPrevPage: true,
      hasNextPage: true,
      prevPage: 1,
      nextPage: 3
    } 
     */

    console.log(result.page);

    let items = {};
    if (result) {
      items = {
        pagination: {
          total: result.totalDocs,
          current: result.page,
          total_page: result.totalPages,
          pageSize: result.limit
        },
        list: result.docs,
        success: true
      };
    } else {
      items = { success: false };
    }

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
    console.log("111111111111111111111", req.params);

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
