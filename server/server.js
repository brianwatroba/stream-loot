const express = require("express");
const config = require("config");
const connectDB = require("./config/db");

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

module.exports = server;
