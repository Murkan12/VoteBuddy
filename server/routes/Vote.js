const express = require("express");
const Vote = require("../models/Vote");
const Router = express.Router();
const Votes = require("../models/Vote");

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
      const voteOptions = vote.options;
      // console.log(voteOptions);
      const numOfVotes = voteOptions.reduce((acc, curr) => {
        return acc + curr.votesNum;
      }, 0);
      // console.log(numOfVotes);
      const percentages = voteOptions.map((element) =>
        Math.round((element.votesNum / numOfVotes) * 100)
      );

      vote.createdAt.setMinutes(vote.createdAt.getMinutes() + 30);
      const time = vote.createdAt;

      res.send({
        ok: true,
        title: vote.title,
        options: vote.options,
        joinCode: req.params.joinCode,
        percentages: percentages,
        expireTime: time,
      });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    res.send(error.message);
  }
});

Router.patch("/:joinCode", async (req, res) => {
  const option = req.body.option;
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

module.exports = Router;
