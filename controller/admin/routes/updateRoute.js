const logger = require("../../../middleware/logger");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { reduce } = require("lodash");

const adapter = new FileSync("routes_db.json");
const routes_db = low(adapter);

/*
 * @desc        This controller takes care of saving the route sent by the client to the
 *              database. In the initial stage, this db is setup as a json object with the
 *              key of 'routes'.
 *
 * @requires    1. (req),        The request with a json - body to be saved in the database
 *              2. (res),        the response to send back to the client, depending on whether the
 *                               saving operation was successful
 *
 * @response    none ( yet )
 */

const UPDATE_ROUTE = (req, res, next) => {
  // Create the DB file if it doesn't exist yet
  console.log("This Controller updates a route");

  routes_db.get("routes").find({ id: req.body.id }).assign(req.body).write();

  res
    .status(200)
    .send(
      JSON.stringify({
        status: "Success",
        msg: "Route has been successfully updated",
      })
    );

  logger.info({
    level: "info",
    time: new Date(),
    message: "Route with ID " + req.body.id + " has been updated",
  });
};

module.exports = UPDATE_ROUTE;
