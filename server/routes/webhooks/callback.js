const express = require("express");
const router = express.Router();
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");

router.post("/", verifyCallbackSrc, async (req, res) => {
  console.log("body", req.body);

  // push into a queue, worker to add to db, perform checks
});

module.exports = router;
