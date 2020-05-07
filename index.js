const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const connect = require("./connection");

const app = express();

// Server configs
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", routes);

// DB Connection
connect();

app.listen(config.port || 8080, () => {
  console.log("Server running on " + config.port);
});
