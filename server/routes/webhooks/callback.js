const express = require("express");
const router = express.Router();
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");
const createSupport = require("../../utils/createSupport");

router.post("/", verifyCallbackSrc, async (req, res) => {
  const { subscription, event } = req.body;
  try {
    const support = createSupport(subscription, event);
    console.log(req);
    return await support.save();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
