const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    viewerId: {
      type: String,
      ref: "User",
      required: true,
    },
    viewerUsername: {
      type: String,
      ref: "User",
      required: true,
    },
    streamerId: {
      type: String,
      ref: "User",
      required: true,
    },
    streamerUsername: {
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
