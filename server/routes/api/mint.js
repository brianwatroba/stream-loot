const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const auth = require("../../middleware/auth");
const { ethers } = require("ethers");
// const config = require("config");
// const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
// const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");

// @route  POST api/twitch/auth
// @desc   get Twitch user token after client Twitch login, call Twitch API to get info about that user, then return info to client
// @access public

router.post("/", auth, async (req, res) => {});

module.exports = router;
