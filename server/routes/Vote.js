require("dotenv").config();

const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");
const checkExpire = require("../middleware/CheckExpire");
const { getSocketInstance } = require("../config/socketConfig");

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
      throw new Error("Vote not found!");
    }
  } catch (error) {
    console.log(error.message);
    res.send({ ok: false, error: error.message });
  }
});

Router.patch("/:joinCode", checkExpire, async (req, res) => {
  const option = req.body.option;
  const joinCode = req.params.joinCode;

  try {
    await Votes.findOneAndUpdate(
      {
        joinCode: joinCode,
        "options.option": option,
      },
      { $inc: { "options.$.votesNum": 1 } }
    );

    const io = getSocketInstance();
    io.to(joinCode).emit("vote-updated", "updated");
    res.send({ ok: true, time: req.time });
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
