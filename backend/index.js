require("dotenv").config();
const express = require("express");
const cors = require("cors");

// create express app
const app = express();
app.use(express.json({ limit: "50mb", type: "application/json" }));
app.use(
  cors({
    origin: "*",
  })
);

require("./bootstrapApplication").bootstrap(app);
app.get("/", function (req, res, next) {
  res.send("HELLO WORD");
});

// listen for requests
var port = process.env.TEST_ENV ? 3011 : process.env.PORT || 3012;
app.listen(port, () => {
  console.log(`Hi!!! Server is listening on port ${port}`);
});

module.exports = app;
