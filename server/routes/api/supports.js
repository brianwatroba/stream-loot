const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Support = require("../../models/Support");

// @route    GET api/supports
// @desc     Get all supports by logged in user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const supports = await Support.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(supports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
