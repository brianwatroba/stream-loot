const mongoose = require("mongoose");

const EmotesSchema = new mongoose.Schema({
  begin: { type: Number },
  end: { type: Number },
  id: { type: String },
});

const MessageSchema = new mongoose.Schema({
  text: { type: String },
  emotes: [EmotesSchema],
});

const SupportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      ref: "User",
      required: true,
    },
    broadcasterUserId: {
      type: String,
      ref: "User",
      required: true,
    },
    broadcasterUserName: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tier: {
      type: Number,
    },
    isGift: {
      type: Boolean,
    },
    message: { type: MessageSchema },
    cumulativeMonths: { type: Number },
    streakMonths: { type: Number },
    durationMonths: { type: Number },
    minted: {
      type: Boolean,
      default: false,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", SupportSchema);
