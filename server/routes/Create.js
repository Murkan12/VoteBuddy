const express = require("express");
const Router = express.Router();
const Votes = require("../models/Vote");
const crypto = require("crypto");

Router.post("/", async (req, res) => {
  const optionsArr = req.body.options;
  const title = req.body.title;
  const joinCode = crypto.randomBytes(8).toString("hex").toUpperCase();

  if (optionsArr.length > 9)
    throw new Error("Server error: Vote options limit crossed!");

  console.log(optionsArr);
  const voteArr = optionsArr.map((element) => {
    return { option: element, votesNum: 0 };
  });

  const newVote = new Votes({
    title: title,
    options: voteArr,
    joinCode: joinCode,
  });

  try {
    await newVote.save();

    const expireDate = new Date(newVote.createdAt);

    res.json({ ok: true, joinCode: joinCode, time: expireDate });
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});

module.exports = Router;
