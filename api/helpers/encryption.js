const crypto = require("crypto");
const config = require("../../config/config");

module.exports = {
  encrypt: (text) => {
    const secret = config.secret;
    return crypto.createHmac("sha256", secret).update(text).digest("hex");
  },
};
