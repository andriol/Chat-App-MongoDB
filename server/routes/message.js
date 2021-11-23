const Message = require("../models/message");
const connect = require("../db/mongoose");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  connect.then(async () => {
    const message = await Message.find({});

    res.json(message);
  });
});

module.exports = router;
