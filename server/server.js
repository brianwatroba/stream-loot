const express = require("express");
const config = require("config");
const connectDB = require("./config/db");
const requestSubscription = require("./utils/requestSubcription");
const getSubscriptions = require("./utils/getSubscriptions");
const deleteAllSubscriptions = require("./utils/deleteAllSubscriptions");
const deleteSubscription = require("./utils/deleteSubscription");

connectDB();

// const path = require("path");
// const cors = require("cors");

const app = express();
const PORT = config.get("PORT");

// Init middleware

app.use(express.static("static"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// Routes
app.use("/webhooks/callback", require("./routes/webhooks/callback"));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// requestSubscription("71092938");
deleteAllSubscriptions();
// getSubscriptions();

// on server close, ensure we close all subs

module.exports = server;
