const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected...");
  } catch (err) {
    console.error(err);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
