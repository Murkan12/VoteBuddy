const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");
const checkExpire = require("../middleware/CheckExpire");

const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    if (room !== undefined) {
      socket.join(room);
      console.log("Joined room " + room);
    }
  });
});

Router.get("/:joinCode", async (req, res) => {
  const vote = await Votes.findOne({ joinCode: req.params.joinCode });

  try {
    if (vote && vote.options) {
      const time = vote.createdAt;

      res.send({
        ok: true,
        title: vote.title,
        options: vote.options,
        joinCode: req.params.joinCode,
        time: time,
      });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    res.send(error.message);
  }
});

Router.use("/:joinCode", async (req, res, next) => {
  const joinCode = req.body.json.joinCode;

  const vote = await Votes.findOne({ joinCode: joinCode });

  try {
    const expireTime =
      vote.createdAt.getTime() + 60000 - new Date().getTime() || null;

    if (expireTime && expireTime > 0) {
      next();
    } else {
      res.send({ ok: false, error: "Vote expired!" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ ok: false, error: error.message });
  }
});

Router.patch("/:joinCode", async (req, res) => {
  const option = req.body.json.option;
  const joinCode = req.params.joinCode;

  console.log(option);

  try {
    await Votes.findOneAndUpdate(
      {
        "options.option": option,
      },
      { $inc: { "options.$.votesNum": 1 } }
    );

    io.to(joinCode).emit("vote-updated", "updated");
    res.send({ ok: true });
  } catch (error) {
    console.log(error.message);
    res.send({ ok: false });
  }
});

Router.get("/expire/:joinCode", async (req, res) => {
  try {
    await Votes.deleteOne({ joinCode: req.params.joinCode });
    res.send({ ok: true });
  } catch (error) {
    console.log(error.message);
    res.send({ ok: false, error: error.message });
  }
});

module.exports = Router;
