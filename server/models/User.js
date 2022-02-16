const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    twitchId: {
      type: String,
      ref: "User",
      required: true,
    },
    twitchUsername: {
      type: String,
      required: true,
    },
    walletAddr: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
