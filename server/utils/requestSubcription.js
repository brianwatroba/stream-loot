const twitchSubUrl = `https://api.twitch.tv/helix/eventsub/subscriptions`;
const ngrokUrl = "https://49d6-2603-7000-3800-81f0-00-a040.ngrok.io";
const webhookUrl = ngrokUrl + "/api/webhook";
const axios = require("axios");

const requestSubscription = async () => {
  const headers = {
    Authorization: `Bearer ` + process.env.TWITCH_API_TOKEN,
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    "Content-Type": "application/json",
  };

  const body = {
    version: "1",
    type: "channel.follow",
    condition: {
      broadcaster_user_id: "19571641",
    },
    transport: {
      method: "webhook",
      callback: webhookUrl,
      // need function to generate secrets
      secret: "abcdefghij0123456789",
    },
  };

  try {
    const res = await axios.post(twitchSubUrl, body, { headers });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = requestSubscription;
