import { Request, Response } from "express";
import Notification from "../models/Notification";
import mongodb from "mongodb";

class NotificationController {
  public async getItems(req: Request, res: Response): Promise<void> {
    const region = req.query.region;
    const limit = req.query.limit;
    let filter = {};
    if (region)
      filter = { ...filter, city: { $regex: region, $options: "i" } };
    const items = await Notification.find(filter).sort({ _id: -1 });

    if (parseInt(limit) === 1){
      if (items[0])
        res.json(items[0]);
      else 
        res.json(0);
    }      
    else 
      res.json(items);

    //////////////----------------add read user--------------------/////////////
    const user_id = req.query.user_id;
    if (!user_id)
      return;
    
    await Notification.updateMany(
        {  },
        { $addToSet: { users: user_id } },
        { new: true }
      );
  }

  public async getItem(req: Request, res: Response) {
    try {
      const url = req.params.url;
      const item = await Notification.findOne({
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
      const { city, content } = req.body;

      const newItem = new Notification({ city, content });
      await newItem.save();

      res.status(200).json({
        success: true,
        msg: "Item saved.",
        item: newItem
      });

      req.io.emit(city, newItem);
      //req.notify("data_note", newItem);
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
      const updatedItem = await Notification.findOneAndUpdate(
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
      const deletedItem = await Notification.findOneAndDelete(
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

      /*const prevItem = await Notification.find().sort({_id:-1}).limit(1);
      console.log(prevItem, 'prevNotification');
      if (prevItem[0])
        req.io.emit("data_note", prevItem[0]);      
      else 
        req.io.emit("data_note", 0);*/
    } catch (err) {
      console.log("error => ", err);
      res.status(200).json({
        success: false,
        msg: "Item not deleted"
      });
    }
  }
}

export default new NotificationController();
