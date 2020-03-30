const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

//load routers
const updateRoute = require("./routes/update.route");
const districtRoute = require("./routes/district.route");

// Load body parser
app.use(bodyParser.json());

//router level middleware
app.use("/", updateRoute);
app.use("/district", districtRoute);

//application level 404 error middleware
app.use((req, res, next) => {
  res.status(404).json({
    err: "Page not found!"
  });
});

//Connect to db
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Connected to db at port, ", process.env.PORT);
  }
);

// initializing the server
app.listen(process.env.PORT);
