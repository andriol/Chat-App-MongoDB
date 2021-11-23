const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: {
    type: String,
  },
  message: {
    type: String,
  },
  username: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
