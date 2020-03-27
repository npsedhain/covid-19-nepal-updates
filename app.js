const express = require("express");
const app = express();

require("dotenv/config");

//load routers
const updateRoute = require("./routes/update.route");

//router level middleware
app.use("/", updateRoute);

//application level 404 error middleware
app.use((req, res, next) => {
  res.status(404).json({
    err: "Page not found!"
  });
});

// initializing the server
app.listen(process.env.PORT, (err, success) => {
  if (err) {
    return console.log("error occurred while starting server");
  }
  console.log(`Server listening at port ${process.env.PORT}...`);
});

//has one bug : deleted user can be logged in as well
