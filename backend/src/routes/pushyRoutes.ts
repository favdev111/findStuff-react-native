import { Router } from "express";
const Pushy = require("pushy");

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/device", async (req, res) => {
      // Plug in your Secret API Key
      // Get it here: https://dashboard.pushy.me/
      let pushyAPI = new Pushy(
        "a22000c207d1f15afbaee51f1da8c03197eaad699d29e8a2013cfa884020902b"
      );

      // Set push payload data to deliver to device(s)
      let data = {
        message: "Hello World!"
      };

      // Insert target device token(s) here
      let to = ["DEVICE_TOKEN"];

      // Optionally, send to a publish/subscribe topic instead
      // to = '/topics/news';

      // Set optional push notification options (such as iOS notification fields)
      let options = {
        notification: {
          badge: 1,
          sound: "ping.aiff",
          body: "Hello World \u270c"
        }
      };

      // Send push notification via the Send Notifications API
      // https://pushy.me/docs/api/send-notifications
      pushyAPI.sendPushNotification(data, to, options, function(err, id) {
        // Log errors to console
        if (err) {
          return console.log("Fatal Error", err);
        }

        // Log success
        console.log("Push sent successfully! (ID: " + id + ")");
      });
    });
  }
}

const authRoutes = new AuthRoutes();
authRoutes.routes();

export default authRoutes.router;
