const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");

Router.post("/", async (req, res) => {
  // await Votes.deleteMany();

  const optionsArr = JSON.parse(req.body.options);
  const title = JSON.parse(req.body.title);

  console.log(optionsArr);
  const voteArr = optionsArr.map((element) => {
    return { option: element, votesNum: 0 };
  });

  const newVote = new Votes({
    title: title,
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

module.exports = Router;
