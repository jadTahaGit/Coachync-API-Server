import { io } from "../app.js";
import { USER_CONNECTED } from "./Events.js";
import { createUser, createMessage, createChat } from "./ChatUtils.js";

let connectedUsers = {};
let communityChat = createChat({ isCommunity: true });

export const ChatManager = (socket) => {
  if (socket != null) {
    console.log("Socket Id: " + socket.id);

    socket.emit("message", "Welcome to the chat!");

    socket.on(USER_CONNECTED, (username, callback) => {
      callback(createUser({ username: username, socketId: socket.id }));
    });
  }
};
