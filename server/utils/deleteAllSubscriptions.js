const getSubscriptions = require("./getSubscriptions");
const deleteSubscription = require("./deleteSubscription");

const deleteAllSubscriptions = async () => {
  try {
    const deleteReqs = [];
    const subs = await getSubscriptions();
    subs.forEach((sub) => {
      deleteReqs.push(deleteSubscription(sub.id));
    });
    const res = Promise.all(deleteReqs);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = deleteAllSubscriptions;
