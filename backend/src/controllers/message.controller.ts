import { Request, Response } from "express";
import mongodb from "mongodb";

import Message from "../models/Message";
import User from "../models/User";
import Room from "../models/Room";

class MessageController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const { room_id, user_id } = req.query;
    console.log("message list of ", room_id);
    if (!room_id) {
      res.json({
        success: true,
        msg: "Item found",
        items: []
      });
      return;
    }
    let filter = {
      room: new mongodb.ObjectID(room_id)
    };

    let items = await Message.find(filter);

    let checkFilter = {
      room: new mongodb.ObjectID(room_id),
      user: { $ne: new mongodb.ObjectID(user_id) }
    };

    await Message.updateMany(checkFilter, {
      $set: { checked: 1 }
    });

    res.json({
      success: true,
      msg: "Item found",
      items
    });
  }

  //update the checked state
  public async getItem(req: Request, res: Response) {
    try {
      const room_id = req.params.url;
      const user_id = req.query.user_id;

      const updatedItem = await Message.updateMany(
        { room: new mongodb.ObjectID(room_id), user: new mongodb.ObjectID(user_id) },
        { $set: { checked: 1 } },
        { multi: true }
      );

      if (!updatedItem)
      console.log('checked update failed...', room_id, user_id);
        return res.status(200).json({
          success: false,
          msg: "Item not updated"
        });

        console.log('checked update success...', room_id, user_id);

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

  public async createItem(req: Request, res: Response): Promise<void> {
    try {
      const { user, room, content, receiver } = req.body;

      console.log(req.body, "received from ...");

      const newItem = new Message({
        user: new mongodb.ObjectID(user),
        room: new mongodb.ObjectID(room),
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
      req.msg(receiver, newItem);

      await Room.findOneAndUpdate(
        { _id: new mongodb.ObjectID(room) },
        {
          label: content
        },
        {
          new: true
        }
      );
    } catch (err) {
      console.log("save error => ", err);
      res.status(500).json({
        success: false,
        msg: "Item not saved"
      });
    }
  }

  //set checked=1 when receiver was in the chat-room screen.
  public async updateItem(req: Request, res: Response): Promise<any> {
    try {
      const url = req.params.url;
      const updatedItem = await Message.findOneAndUpdate(
        { _id: new mongodb.ObjectID(url) },
        { checked: 1 },
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
