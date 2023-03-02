const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");

Router.get("/:joinCode", async (req, res) => {
  const vote = await Votes.findOne({ joinCode: req.params.joinCode });
  try {
    if (vote && vote.options) {
      res.send({
        ok: true,
        options: vote.options,
        joinCode: req.params.joinCode,
      });
    } else {
      res.send({ ok: false });
    }
  } catch (error) {
    res.send(error.message);
  }
});

Router.patch("/:joinCode", async (req, res) => {
  console.log(req.body.option);
  const option = req.body.option;

  await Votes.findOneAndUpdate(
    {
      "options.option": String(req.body.option),
    },
    { $inc: { "options.$.votesNum": 1 } }
  );
});

module.exports = Router;
