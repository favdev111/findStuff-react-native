import { Request, Response } from "express";
import mongodb from "mongodb";

import Room from "../models/Room";
import User from "../models/User";
import Message from "../models/Message";

class RoomController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const user_id = req.query.user_id;
    console.log("room list of ", user_id);
    if (!user_id) {
      res.json({
        success: false,
        msg: "Item not found",
        items: []
      });
      return;
    }
    let rooms = await Room.find({
      users: { $in: [new mongodb.ObjectID(user_id)] } //$elemMatch:{$eq:ObjectId("5e2916615f55cc6e3cb9838b")}
    });

    const promises = await rooms.map(async (r, i) => {
      let m = await Message.aggregate([
        {
          $match: {
            room: { $eq: new mongodb.ObjectID(r._id) },
            user: { $ne: new mongodb.ObjectID(user_id) },
            checked: 0
          }
        },
        {
          $group: {
            _id: "$room",
            missed: { $sum: 1 }
          }
        }
      ]);

      console.log(m[0], "_____________________________________");

      console.log(r, "+******************************");

      return Object.assign({}, r._doc, {
        missed: m[0].missed
      });
    });

    rooms = await Promise.all(promises);

    console.log(rooms, "`````````````````````");

    res.json({
      success: true,
      msg: "Item found",
      items: rooms
    });
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;

      const items = await Room.find({ _id: url });

      if (!items)
        return res.status(400).json({
          success: false,
          msg: "Item not found"
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
      const { uid1, uid2 } = req.body;

      console.log("uid1, uid2, ", uid1, uid2);

      if (!uid1 || !uid2) {
        res.status(200).json({
          success: false,
          msg: "Item not saved"
        });
        return;
      }

      const filter = {
        $and: [
          { users: new mongodb.ObjectID(uid1) },
          { users: new mongodb.ObjectID(uid2) }
        ]
      };

      const rooms = await Room.find(filter);
      const currentItem = rooms[0];

      if (currentItem) {
        res.status(200).json({
          success: true,
          msg: "Item retrieved.",
          item: currentItem
        });
        return;
      }

      const newItem = new Room({
        users: [new mongodb.ObjectID(uid1), new mongodb.ObjectID(uid2)],
        label: ""
      });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "Item saved.",
        item: newItem
      });

      req.io.emit(uid1, newItem);
      req.io.emit(uid2, newItem);
    } catch (err) {
      console.log("error => ", err);
      res.status(200).json({
        success: false,
        msg: "Item not saved"
      });
    }
  }

  public async updateItem(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedItem = await Room.findOneAndUpdate(
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
      const deletedItem = await Room.findOneAndDelete(
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

export default new RoomController();
