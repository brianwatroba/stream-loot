const axios = require("axios");
const { TWITCH_SUB_URL } = require("../constants/urls");
const { TWITCH_HEADERS } = require("../constants/headers");

const deleteSubscription = async (uuid) => {
  const uuidParam = `?id=${uuid}`;

  try {
    const res = await axios.delete(TWITCH_SUB_URL + uuidParam, TWITCH_HEADERS);
    console.log("deleteSubscription()", res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = deleteSubscription;
