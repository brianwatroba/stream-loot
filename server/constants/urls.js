const TWITCH_SUB_URL = `https://api.twitch.tv/helix/eventsub/subscriptions`;

const NGROK_URL = "https://3939-2603-7000-3800-81f0-00-a040.ngrok.io";

let SL_WEBHOOK_URL;
process.env.NODE_ENV !== "production"
  ? (SL_WEBHOOK_URL = NGROK_URL + "/webhooks/callback")
  : (SL_WEBHOOK_URL = "/webhooks/callback");

module.exports = { TWITCH_SUB_URL, SL_WEBHOOK_URL };
