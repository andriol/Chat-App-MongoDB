const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const socketio = require("socket.io");
const server = require("http").createServer(app);
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");

require("./db/mongoose");
const port = process.env.PORT || 8081;
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
require("./chat.js")(io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRoute);
app.use("/message", messageRoute);

server.listen(port, () => {
  console.log(`Server is runnign on port ${port}`);
});
