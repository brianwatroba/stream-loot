const express = require("express");
const connectDB = require("./config/db");
const requestSubscription = require("./utils/requestSubcription");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
connectDB();

// const path = require("path");
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Init middleware
app.use(express.static("static"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// Define routes
app.use("/api/webooks/callback", require("./routes/webhooks/callback"));
// app.use('/api/entries', require('./routes/api/entries'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/sms', require('./routes/api/sms'));
// app.use('/api/twofac', require('./routes/api/twofac'));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

requestSubscription();

module.exports = server;
