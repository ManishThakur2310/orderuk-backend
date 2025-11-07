const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = ConnectDb;
