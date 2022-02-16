const mongoose = require("mongoose");

const LootSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const StreamLootSchema = new mongoose.Schema(
  {
    streamerTwitchId: {
      type: String,
      ref: "User",
      required: true,
    },
    streamerTwitchUsername: {
      type: String,
      required: true,
    },
    contractAddr: {
      type: String,
      required: true,
    },
    token: LootSchema,
    nft1: LootSchema,
    nft2: LootSchema,
    nft3: LootSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StreamLoot", StreamLootSchema);
