const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");

Router.get("/time/:joinCode", async (req, res) => {
  const vote = await Votes.findOne({ joinCode: req.params.joinCode });

  try {
    vote.createdAt.setMinutes(vote.createdAt.getMinutes() + 30);
    const time = vote.createdAt;
    res.send({ ok: true, expireTime: time });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = Router;
