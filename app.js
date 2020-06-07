// Initialize the base modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");

// Initialize the routes and the application
const routerOdata = require("./routes/api/odata");
const routerProperties = require("./routes/api/metadata");
const app = express();

// Initialize the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Uncomment these to set the CORS headers
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// Configure the routes
app.use("/odata", routerOdata);
app.use("/ometa", routerProperties)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Basic Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send a basic error msg
  res.send({
    statusText: 'error', 
    msg: "An error has occured. " + err.message
  });
});

// Configure the port. Uses standard node port, alternatively 3000 if not available
app.set("port", process.env.PORT || 3000);

// Make the app listen to the standard port
app.listen(app.get("port"), () =>
  logger.info({
    level: "info",
    message: "Started server at "
      .concat(new Date())
      .concat(" on port ")
      .concat(app.get("port")),
  })
);
