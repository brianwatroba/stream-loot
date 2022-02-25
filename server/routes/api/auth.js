// client initaties call to twitch auth
// it sends code to this route
// save it to the user model to check with auth middleware
// set a cookie on client, look at chatformer, google
// in all protected actions/calls, auth middeware checks the session cookie in req, uses some oauth library to check it to ensure its valid

const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const config = require("config");
const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");
const { TWITCH_USERS_URL } = require("../../constants/urls");

// @route  POST api/twitch/auth
// @desc   get Twitch user token after client Twitch login, call Twitch API to get info about that user, then return info to client
// @access public

router.post("/", async (req, res) => {
  const code = req.body.code;
  const clientUrl = req.headers.origin;

  if (!code) res.status(400).send("No auth code provided");

  const baseUrl = "https://id.twitch.tv/oauth2/token";
  const clientIdParam = `?client_id=${TWITCH_CLIENT_ID}`;
  const clientSecretParam = `&client_secret=${TWITCH_CLIENT_SECRET}`;
  const codeParam = `&code=${code}`;
  const grantType = `&grant_type=authorization_code`;
  const redirectUri = `&redirect_uri=${clientUrl}/auth`;

  // Get user token from Twitch, uses code from client Twitch login
  try {
    const twitchResponse = await axios.post(
      baseUrl +
        clientIdParam +
        clientSecretParam +
        codeParam +
        grantType +
        redirectUri
    );

    const token = twitchResponse.data.access_token;

    //  Get info about that user via Twitch API
    const user = await axios.get(TWITCH_USERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": TWITCH_CLIENT_ID,
      },
    });

    const userData = user.data.data[0];
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
