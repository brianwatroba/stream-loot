const axios = require("axios").default;
const config = require("config");
const TWITCH_CLIENT_SECRET = config.get("TWITCH_CLIENT_SECRET");
const TWITCH_CLIENT_ID = config.get("TWITCH_CLIENT_ID");
const { TWITCH_AUTH_URL, TWITCH_USERS_URL } = require("../constants/urls");

// TODO: this needs to read a cookie and verify it to ensure they're logged into twitch, oauth perhaps

// const auth = async (req, res, next) => {
//   const code = req.body.code;
//   if (!code) return res.status(400).send("No auth code provided");

//   // Get user token from Twitch, uses code from client Twitch login
//   try {
//     const twitchResponse = await axios.post(buildUserTokenUrl(req));
//     const token = twitchResponse.data.access_token;

//     // TODO: validate auth token, send bad response if incorrect

//     const user = await axios.get(TWITCH_USERS_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Client-Id": TWITCH_CLIENT_ID,
//       },
//     });

//     const userData = user.data.data[0];
//     req.body.user = userData;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

// const buildUserTokenUrl = (req) => {
//   const clientIdParam = `?client_id=${TWITCH_CLIENT_ID}`;
//   const clientSecretParam = `&client_secret=${TWITCH_CLIENT_SECRET}`;
//   const codeParam = `&code=${req.body.code}`;
//   const grantType = `&grant_type=authorization_code`;
//   // need the right redirect
//   const redirectUri = `&redirect_uri=${req.headers.origin}/auth`;

//   return (
//     TWITCH_AUTH_URL +
//     clientIdParam +
//     clientSecretParam +
//     codeParam +
//     grantType +
//     redirectUri
//   );
// };

// module.exports = auth;
