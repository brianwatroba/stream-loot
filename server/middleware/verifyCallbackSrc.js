const crypto = require("crypto");
const {
  TWITCH_MESSAGE_ID,
  TWITCH_MESSAGE_TIMESTAMP,
  TWITCH_MESSAGE_SIGNATURE,
  TWITCH_MESSAGE_TYPE,
  MESSAGE_TYPE_VERIFICATION,
  MESSAGE_TYPE_NOTIFICATION,
  MESSAGE_TYPE_REVOCATION,
} = require("../constants/headers");

const verifyCallbackSrc = (req, res, next) => {
  const HMAC_PREFIX = "sha256=";
  const secret = process.env.EVENT_SUB_SECRET;
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message);

  if (verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {
    const notification = req.body;

    if (MESSAGE_TYPE_NOTIFICATION === req.headers[TWITCH_MESSAGE_TYPE]) {
      res.sendStatus(204);
      next();
    } else if (MESSAGE_TYPE_VERIFICATION === req.headers[TWITCH_MESSAGE_TYPE]) {
      res.status(200).send(notification.challenge);
    } else if (MESSAGE_TYPE_REVOCATION === req.headers[TWITCH_MESSAGE_TYPE]) {
      res.sendStatus(204);
      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      console.log(
        `condition: ${JSON.stringify(
          notification.subscription.condition,
          null,
          4
        )}`
      );
    } else {
      res.sendStatus(204);
      console.log(`Unknown message type: ${req.headers[TWITCH_MESSAGE_TYPE]}`);
    }
  } else {
    // Signatures didn't match.
    console.log("403");
    res.sendStatus(403);
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
