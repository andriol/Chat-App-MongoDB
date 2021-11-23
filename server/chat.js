const Message = require("./models/message");
const connect = require("./db/mongoose");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (data) => {
      socket.join(data);
      console.log("User has joined:" + data);
    });
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data.content);

      connect.then(() => {
        const chatMessage = new Message({
          room: data.room,
          username: data.content.username,
          message: data.content.message,
          owner: data.content.owner._id,
        });
        chatMessage.save();
      });
    });

    socket.on("disconnect", () => {
      console.log("User left the chat room!");
    });
  });
};
