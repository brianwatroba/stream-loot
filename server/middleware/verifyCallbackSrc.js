const crypto = require("crypto");
const {
  TWITCH_MESSAGE_ID,
  TWITCH_MESSAGE_TIMESTAMP,
  TWITCH_MESSAGE_SIGNATURE,
  TWITCH_MESSAGE_TYPE,
  MESSAGE_TYPE_VERIFICATION,
  MESSAGE_TYPE_NOTIFICATION,
} = require("../constants/headers");

const verifyCallbackSrc = (req, res, next) => {
  const HMAC_PREFIX = "sha256=";
  const secret = process.env.EVENT_SUB_SECRET;
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message);

  if (verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {
    const notification = req.body;
    if (req.headers[TWITCH_MESSAGE_TYPE] === MESSAGE_TYPE_NOTIFICATION) {
      res.sendStatus(204);
      next();
    } else if (req.headers[TWITCH_MESSAGE_TYPE] === MESSAGE_TYPE_VERIFICATION) {
      res.status(200).send(notification.challenge);
    } else {
      res.sendStatus(204);
    }
  } else {
    console.log("403");
    res.sendStatus(403);
  }
};

const getHmacMessage = (req) => {
  return (
    req.headers[TWITCH_MESSAGE_ID] +
    req.headers[TWITCH_MESSAGE_TIMESTAMP] +
    JSON.stringify(req.body)
  );
};

const getHmac = (secret, message) => {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
};

const verifyMessage = (hmac, signature) => {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
};

module.exports = verifyCallbackSrc;
