const express = require("express");
const router = express.Router();
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");
const Support = require("../../models/Support");
const {
  CHANNEL_FOLLOW,
  CHANNEL_SUBSCRIBE,
  CHANNEL_SUBSCRIPTION_GIFT,
  CHANNEL_CHEER,
} = require("../../constants/subTypes");

router.post("/", verifyCallbackSrc, async (req, res) => {
  const { subscription, event } = req.body;
  const { user_id, user_login, broadcaster_user_id, broadcaster_user_login } =
    event;

  if (subscription.type === CHANNEL_FOLLOW) {
    const {
      user_id: viewerId,
      user_login: viewerUsername,
      broadcaster_user_id: streamerId,
      broadcaster_user_login: streamerUsername,
    } = event;
    const support = new Support({
      viewerId,
      viewerUsername,
      streamerId,
      streamerUsername,
      type: CHANNEL_FOLLOW,
      value: 1,
    });

    const saved = await support.save();
    console.log(saved);
    return saved;
  }

  // push into a queue, worker to add to db, perform checks
});

module.exports = router;
