const axios = require("axios");
const { TWITCH_SUB_URL } = require("../constants/urls");
const { TWITCH_HEADERS } = require("../constants/headers");

const getSubscriptions = async () => {
  try {
    const res = await axios.get(TWITCH_SUB_URL, TWITCH_HEADERS);
    const subs = res.data.data;
    console.log(subs);
    return subs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = getSubscriptions;
