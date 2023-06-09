const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

async function connectDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
