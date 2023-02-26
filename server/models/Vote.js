const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  options: { type: Array, required: true },
});

module.exports = mongoose.model("Votes", voteSchema);
