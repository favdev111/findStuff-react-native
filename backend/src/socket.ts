import { Server, Socket } from "socket.io";
import uuid from "uuid/v4";

const messageExpirationTimeMS = 10 * 1000;

export interface User {
  id: string;
  name: string;
}

const defaultUser: User = {
  id: "anon",
  name: "Anonymous"
};

export interface Message {
  user: User;
  id: string;
  time: Date;
  value: string;
}

export const sendMessage = (socket: Socket | Server) => (message: Message) =>
  socket.emit("bg_message", message);

export default (io: Server, connectedUsers: any) => {
  const messages: Set<Message> = new Set();

  io.on("connection", async socket => {
    const { user_id } = socket.handshake.query;

    if (user_id) {
      connectedUsers[user_id] = socket.id;
    } else {
    }

    socket.on("getMessages", () => {
      messages.forEach(sendMessage(socket));
    });

    socket.on("message", (value: string) => {
      const message: Message = {
        id: uuid(),
        time: new Date(),
        user: defaultUser,
        value
      };

      messages.add(message);

      sendMessage(io)(message);

      setTimeout(() => {
        messages.delete(message);
        io.emit("deleteMessage", message.id);
      }, messageExpirationTimeMS);
    });
    socket.on("disconnect", _ => {
      delete connectedUsers[user_id];
    });
  });
};
