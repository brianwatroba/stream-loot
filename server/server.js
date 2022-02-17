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
// app.use(
//   express.raw({
//     type: "application/json",
//   })
// );
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// Define routes
app.use("/webhooks/callback", require("./routes/webhooks/callback"));
// app.use('/api/entries', require('./routes/api/entries'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/sms', require('./routes/api/sms'));
// app.use('/api/twofac', require('./routes/api/twofac'));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// requestSubscription("71092938");
// deleteSubscription("499863cb-039d-40b2-9d57-e48595095306");
getSubscriptions();

module.exports = server;
