const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

//load routers
const updateRoute = require("./routes/update.route");
const districtRoute = require("./routes/district.route");
const stateRoute = require("./routes/state.route");

// Load body parser
app.use(bodyParser.json());

// load cors
app.use(cors());

//router level middleware
app.use("/", updateRoute);
app.use("/district", districtRoute);
app.use("/state", stateRoute);

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
