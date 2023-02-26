const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");

Router.post("/", async (req, res) => {
  await Votes.deleteMany();

  const optionsArr = JSON.parse(req.body.options);

  console.log(optionsArr);
  const voteArr = optionsArr.map((element) => {
    return { option: element, votesNum: 0 };
  });

  const newVote = new Votes({
    options: voteArr,
  });

  await newVote.save();
});

Router.get("/:id", async (req, res) => {
  const vote = await Votes.findById(req.params.id);

  res.send(vote.options);
});

module.exports = Router;
