const mongoose = require("mongoose");
const crypto = require("crypto");

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: { type: Array, required: true },
  joinCode: { type: String, require: true, unique: true },
});

voteSchema.pre("validate", function (next) {
  this.joinCode = crypto.randomBytes(8).toString("hex").toUpperCase();
  next();
});

module.exports = mongoose.model("Votes", voteSchema);
