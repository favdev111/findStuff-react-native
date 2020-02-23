import Notification from "../models/Notification";

export async function getLastNote() {
  try {
    console.log("request from the client.....");

    const item = await Notification.find({})
      .sort({ _id: -1 })
      .limit(1);

    if (!item) return "";

    return item[0];
  } catch (err) {
    return "";
  }
}
