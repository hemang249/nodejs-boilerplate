const config = require("./config/config");
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => {
      console.log(err);
      process.exit(-1);
    });
};

module.exports = connect;
