const Support = require("../models/Support");
const {
  // CHANNEL_FOLLOW,
  CHANNEL_SUBSCRIBE,
  CHANNEL_SUBSCRIPTION_MESSAGE,
  CHANNEL_CHEER,
  // CHANNEL_SUBSCRIPTION_GIFT,
} = require("../constants/subTypes");

const createSupport = (subscription, event) => {
  // TODO: map support to the ID on the contract somehow
  const type = subscription.type;
  const {
    user_id: userId,
    user_name: userName,
    broadcaster_user_id: broadcasterUserId,
    broadcaster_user_name: broadcasterUserName,
  } = event;

  const support = {
    userId,
    userName,
    broadcasterUserId,
    broadcasterUserName,
    type: subscription.type,
  };

  if (type === CHANNEL_SUBSCRIBE) {
    support.tier = event.tier;
    support.isGift = event.isGift;
  }

  if (type === CHANNEL_SUBSCRIPTION_MESSAGE) {
    support.tier = event.tier;
    support.message = {
      text: event.message.text,
      emotes: event.message.emotes,
    };
    support.cumulativeMonths = event.cumulative_months;
    support.streakMonths = event.streak_months;
    support.durationMonths = event.duration_months;
    support.tokenId =
      event.cumulative_months === 3
        ? 1
        : event.cumulative_months === 6
        ? 2
        : event.cumulative_months === 9
        ? 3
        : null;
  }

  if (type === CHANNEL_CHEER) {
    support.message = event.message;
    support.bits = event.bits;
    support.tokenId = 0;
  }

  return new Support(support);
};

const mapToTokenId = (subscriptionType, event) => {};

module.exports = createSupport;
