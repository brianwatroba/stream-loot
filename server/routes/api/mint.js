const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const auth = require("../../middleware/auth");
const config = require("config");
const { ethers } = require("ethers");
const { wallet } = require("../../config/signer");
// const config = require("config");
// const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
// const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");

// @route  POST api/mint
// @desc   get message sig for users to call contract to mint their tokens
// @access private

router.post("/", async (req, res) => {
  const { to, tokenId, amount } = req.body;
  // in req:
  // from auth: twitchUserId, verified that it's them
  // in post:
  //    address
  //    token id => could be array, check for it
  //    amount
  // check twitch auth
  // look up if they have enough supports, check against it
  const signer = new ethers.Wallet(config.get("WALLET_PRIVATE_KEY"));
  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint256", "uint256"],
    [to, tokenId, amount]
  );
  const message = ethers.utils.arrayify(hash);
  const signature = await signer.signMessage(message);

  res.status(200).json({ to, tokenId, amount, signature });
});

module.exports = router;
