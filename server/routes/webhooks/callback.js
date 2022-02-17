const express = require("express");
const router = express.Router();
const verifyCallback = require("../../utils/verifyCallback");
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");

router.post("/", verifyCallbackSrc, async (req, res) => {
  console.log("getting to rinal");
  // const notification = JSON.parse(req.body);
  // const challenge = req.myChallenge;

  return res.status(200).json(req.body.challenge);

  // const challenge = req.body.challenge;
  // if (challenge) {
  //   response.status(200).send(challenge);
  // }
});

module.exports = router;
