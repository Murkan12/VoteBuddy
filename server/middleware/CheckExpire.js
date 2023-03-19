const Votes = require("../models/Vote");

const checkExpire = async function (req, res, next) {
  const joinCode = req.params.joinCode;

  try {
    const vote = await Votes.findOne({ joinCode: joinCode });

    if (vote) {
      const expireDate = new Date(
        vote.createdAt.getSeconds() + 60 - new Date().getSeconds()
      );
      if (expireDate && expireDate > 0) {
        req.time = expireDate;
        next();
      } else {
        res.send({ ok: false, error: "Vote expired!" });
      }
    } else {
      throw new Error("Vote expired!");
    }
  } catch (error) {
    console.log(error.message);
    res.send({ ok: false, error: error.message });
  }
};

module.exports = checkExpire;
