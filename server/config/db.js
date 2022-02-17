const config = require("config");
const mongoose = require("mongoose");
const MONGO_URI = config.get("MONGO_URI");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected...");
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = connectDB;
