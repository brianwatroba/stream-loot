const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const auth = require("../../middleware/auth");
const { ethers } = require("ethers");
// const config = require("config");
// const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
// const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");

// @route  POST api/mint
// @desc   get message sig for users to call contract to mint their tokens
// @access private

router.post("/", async (req, res) => {
  // check twitch auth
  // look up if they have enough supports, check against it
  // if they do, sign the transaction, get sig
  // send them the sig
});

module.exports = router;
