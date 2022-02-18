const Support = require("../models/Support");
const createSupport = require("./createSupport");
const {
  CHANNEL_SUBSCRIBE,
  CHANNEL_SUBSCRIPTION_MESSAGE,
  CHANNEL_CHEER,
} = require("../constants/subTypes");

const VIEWER = {
  userId: 94356048,
  userName: "brianwatroba",
};

const STREAMERS = [
  {
    broadcasterUserId: 71092938,
    broadcasterUserName: "xQcOW",
  },
  { broadcasterUserId: 37402112, broadcasterUserName: "shroud" },
  {
    broadcasterUserId: 19571641,
    broadcasterUserName: "Ninja",
  },
];

const seedDb = async () => {
  console.log("Starting seed...");
  const supports = [];
  STREAMERS.forEach((streamer) => {
    const { subscription, event } = genCheer(VIEWER, streamer);
    supports.push(createSupport(subscription, event));
  });
  STREAMERS.forEach((streamer) => {
    const { subscription, event } = genResub(VIEWER, streamer);
    supports.push(createSupport(subscription, event));
  });
  try {
    const res = await Support.insertMany(supports);
    if (res) return console.log("Test DB seeded!");
  } catch (error) {
    console.log(error);
    return error;
  }
};

const genRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const genSub = (viewer, streamer) => {
  return {
    subscription: {
      type: CHANNEL_SUBSCRIBE,
    },
    event: {
      user_id: viewer.userId,
      user_login: "cool_user",
      user_name: viewer.userName,
      broadcaster_user_id: streamer.broadcasterUserId,
      broadcaster_user_login: "cooler_user",
      broadcaster_user_name: streamer.broadcasterUserName,
      tier: "2000",
      is_gift: false,
    },
  };
};

const genCheer = (viewer, streamer) => {
  return {
    subscription: {
      type: CHANNEL_CHEER,
    },
    event: {
      is_anonymous: false,
      user_id: viewer.userId,
      user_login: "cool_user",
      user_name: viewer.userName,
      broadcaster_user_id: streamer.broadcasterUserId,
      broadcaster_user_login: "cooler_user",
      broadcaster_user_name: streamer.broadcasterUserName,
      message: { text: "pogchamp" },
      bits: genRandomInt(1000, 20000),
    },
  };
};

const genResub = (viewer, streamer) => {
  return {
    subscription: {
      type: CHANNEL_SUBSCRIPTION_MESSAGE,
    },
    event: {
      user_id: viewer.userId,
      user_login: "cool_user",
      user_name: viewer.userName,
      broadcaster_user_id: streamer.broadcasterUserId,
      broadcaster_user_login: "cooler_user",
      broadcaster_user_name: streamer.broadcasterUserName,
      tier: "1000",
      message: {
        text: "Love the stream! FevziGG",
        emotes: [
          {
            begin: 23,
            end: 30,
            id: "302976485",
          },
        ],
      },
      cumulative_months: 15,
      streak_months: 1,
      duration_months: 6,
    },
  };
};

module.exports = seedDb;
