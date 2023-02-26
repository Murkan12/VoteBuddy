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

  try {
    await newVote.save();

    const createdVote = await Votes.findOne({ options: voteArr });
    const joinCode = createdVote.joinCode;
    res.json(joinCode);
  } catch (error) {
    res.send(error.message);
  }
});

Router.get("/:joinCode", async (req, res) => {
  const vote = await Votes.findOne(req.params.id);

  res.send(vote.options);
});

module.exports = Router;
