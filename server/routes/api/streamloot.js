const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const auth = require("../../middleware/auth");
const { ethers } = require("ethers");
// const config = require("config");
// const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
// const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");

// @route  POST api/streamloot
// @desc   get message sig for streamers to create a streamloot
// @access private

router.post("/", async (req, res) => {
  // warn on front end if streamloot already exists
  // check twitch auth
  // if they do, sign the transaction, get sig
  // send them the sig
});

module.exports = router;
