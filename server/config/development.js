require("./loadEnv")("development");

module.exports = {
  PORT: 4000,
  MONGO_URI: process.env.MONGO_URI,
};
