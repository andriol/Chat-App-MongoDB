const User = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const auth = require("../middlewares/auth");

router.post("/register", (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, function (err, hashedPassword) {
    if (err)
      return res.status(500).json({ message: "couldn't encrypt password" });

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      room: req.body.room,
    });
    user
      .save()
      .then((user) => {
        const token = auth.signJWTToken(user);
        res
          .status(201)
          .json({ authToken: token, message: "User successfully registered!" });
      })

      .catch((err) => {
        res.status(400).json(err.message);
      });
  });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    bcrypt.compare(password, user.password, function (err, result) {
      const token = auth.signJWTToken(user);
      console.log(result);
      if (result) {
        return res.status(200).json({ authToken: token, _id: user._id });
      } else {
        return res
          .status(403)
          .json({ message: "Username/password combination is wrong" });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: "User is not found" });
  }
});

router.get("/profile", auth.auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.decoded._id });

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
