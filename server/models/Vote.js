const mongoose = require("mongoose");
const crypto = require("crypto");

const voteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    options: { type: Array, required: true },
    joinCode: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

voteSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });
voteSchema.index({ joinCode: 1 });

module.exports = mongoose.model("Votes", voteSchema);
