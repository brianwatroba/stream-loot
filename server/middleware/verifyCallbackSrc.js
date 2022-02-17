const crypto = require("crypto");
const {
  TWITCH_MESSAGE_ID,
  TWITCH_MESSAGE_TIMESTAMP,
  TWITCH_MESSAGE_SIGNATURE,
  TWITCH_MESSAGE_TYPE,
} = require("../constants/headers");

const verifyCallbackSrc = (req, res, next) => {
  if (req.headers[TWITCH_MESSAGE_TYPE] === "webhook_callback_verification") {
    const HMAC_PREFIX = "sha256=";
    const secret = process.env.EVENT_SUB_SECRET;
    const message = getHmacMessage(req);
    const hmac = HMAC_PREFIX + getHmac(secret, message);

    if (verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {
      console.log("Middleware: signatures match");
      next();
    } else {
      console.log("invalid source");
      res.sendStatus(403);
    }
  }
};

const getHmacMessage = (request) => {
  return (
    request.headers[TWITCH_MESSAGE_ID] +
    request.headers[TWITCH_MESSAGE_TIMESTAMP] +
    JSON.stringify(request.body)
  );
};

const getHmac = (secret, message) => {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
};

const verifyMessage = (hmac, sig) => {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sig));
};

module.exports = verifyCallbackSrc;
