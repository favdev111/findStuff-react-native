import User from "./models/User";
const Pushy = require("pushy");

const pushyAPI = new Pushy(
  "a22000c207d1f15afbaee51f1da8c03197eaad699d29e8a2013cfa884020902b"
);

const options = {
  notification: {
    badge: 1,
    sound: "ping.aiff",
    body: "Hello World \u270c"
  }
};

export const msg = async (uid, data) => {
  const user = await User.find({ _id: uid });
  const channel = user[0].device;

  if (!user[0] || !channel) {
    console.log("wrong user");
    return;
  }

  console.log(user[0], "====user");
  console.log(channel, "===device");

  const msgData = {
    _id: data._id,
    content: data.content,
    createAt: data.createAt,
    channel
  };

  pushyAPI.sendPushNotification(msgData, channel, options, function(err, id) {
    // Log errors to console
    if (err) {
      return console.log("Fatal Error", err);
    }

    console.log("Push sent successfully! (ID: " + id + ")");
  });
};

export const notify = (channel, data) => {
  const notifyData = {
    _id: data._id,
    content: data.content,
    createAt: data.createAt,
    channel
  };
  pushyAPI.sendPushNotification(
    notifyData,
    "/topics/" + channel,
    options,
    function(err, id) {
      // Log errors to console
      if (err) {
        return console.log("Fatal Error", err);
      }

      console.log("Push sent successfully! (ID: " + id + ")");
    }
  );
};
