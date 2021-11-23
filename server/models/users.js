const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      const pass = "password";
      if (value.toLowerCase().includes(pass)) {
        throw new Error(`Password cannot contain ${pass}`);
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  room: {
    type: String,
    required: true,
    trim: true,
  },
});
userSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "owner",
});
const User = mongoose.model("User", userSchema);

module.exports = User;
