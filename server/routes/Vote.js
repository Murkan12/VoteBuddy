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

module.exports = Router;
