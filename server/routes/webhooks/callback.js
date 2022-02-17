const express = require("express");
const router = express.Router();
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");
const saveSupport = require("../../utils/saveSupport");

router.post("/", verifyCallbackSrc, async (req, res) => {
  const { subscription, event } = req.body;

  try {
    const res = await saveSupport(subscription, event);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }

  // push into a queue, worker to add to db, perform checks?
});

module.exports = router;
