const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  secret: process.env.SECRET,
};
