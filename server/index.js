const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const { server } = require("./server");

connectDb();

mongoose.connection.once("open", () => {
  console.log("Connected to database...");

  server.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});
