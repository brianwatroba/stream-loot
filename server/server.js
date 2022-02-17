const express = require("express");
const config = require("config");
const connectDB = require("./config/db");
const requestSubscription = require("./utils/requestSubcription");
const getSubscriptions = require("./utils/getSubscriptions");
const deleteAllSubscriptions = require("./utils/deleteAllSubscriptions");

const { CHANNEL_FOLLOW } = require("./constants/subTypes");

connectDB();

const app = express();
const PORT = config.get("PORT");

// Init middleware
app.use(express.static("static"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/webhooks/callback", require("./routes/webhooks/callback"));
app.use("/api/supports", require("./routes/api/supports"));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// requestSubscription("71092938", CHANNEL_FOLLOW);
deleteAllSubscriptions();
// getSubscriptions();

// on server crash, ensure we close all subs somehow
// handle duplicate subscriptions, have fallback to delete extras

module.exports = server;
