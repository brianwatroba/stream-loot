const config = require("config");

const TWITCH_HEADERS = {
  headers: {
    Authorization: `Bearer ` + config.get("TWITCH_API_TOKEN"),
    "Client-ID": config.get("TWITCH_CLIENT_ID"),
  },
};
const TWITCH_MESSAGE_ID = "Twitch-Eventsub-Message-Id".toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  "Twitch-Eventsub-Message-Timestamp".toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  "Twitch-Eventsub-Message-Signature".toLowerCase();
const TWITCH_MESSAGE_TYPE = "twitch-eventsub-message-type".toLowerCase();

module.exports = {
  TWITCH_HEADERS,
  TWITCH_MESSAGE_ID,
  TWITCH_MESSAGE_TIMESTAMP,
  TWITCH_MESSAGE_SIGNATURE,
  TWITCH_MESSAGE_TYPE,
};
