const express = require("express");
const router = express.Router();
const verifyCallbackSrc = require("../../middleware/verifyCallbackSrc");

router.post("/", verifyCallbackSrc, async (req, res) => {
  console.log("req header", req.headers["twitch-eventsub-message-type"]);
  console.log("body", req.body);
  const challenge = req.body.challenge;
  console.log("challenge", challenge);
  if (challenge) {
    res.json(challenge);
    console.log("challenge sent in middleware");
  }
  // const challenge = req.body.challenge;
  // if (challenge) {
  //   response.status(200).send(challenge);
  // }
});

module.exports = router;
