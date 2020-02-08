import Notification from "../models/Notification";

export async function getLastNote() {
  try {
    const item = await Notification.find({})
      .sort({ _id: -1 })
      .limit(1);

    if (!item) return "";

    return item[0].content;
  } catch (err) {
    return "";
  }
}
