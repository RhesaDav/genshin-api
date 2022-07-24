const mongoose = require("mongoose");

function database() {
  main().catch((error) => console.log("error", error));
  async function main() {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  }
}

module.exports = database;
