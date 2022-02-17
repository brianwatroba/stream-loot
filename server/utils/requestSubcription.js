const axios = require("axios");
const { TWITCH_SUB_URL, SL_WEBHOOK_URL } = require("../constants/urls");
const { TWITCH_HEADERS } = require("../constants/headers");
const config = require("config");

const requestSubscription = async (streamerId) => {
  const body = {
    version: "1",
    type: "channel.follow",
    condition: {
      broadcaster_user_id: streamerId,
    },
    transport: {
      method: "webhook",
      callback: SL_WEBHOOK_URL,
      secret: config.get("EVENT_SUB_SECRET"),
    },
  };

  try {
    const res = await axios.post(TWITCH_SUB_URL, body, TWITCH_HEADERS);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = requestSubscription;
