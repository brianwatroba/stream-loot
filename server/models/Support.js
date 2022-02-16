const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    viewerTwitchId: {
      type: String,
      ref: "User",
      required: true,
    },
    streamerTwitchId: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", SupportSchema);
