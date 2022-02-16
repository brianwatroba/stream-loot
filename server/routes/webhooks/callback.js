const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("From webhook");
  console.log(req);
});

module.exports = router;
