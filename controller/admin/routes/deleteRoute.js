const logger = require("../../../middleware/logger");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

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

const DELETE_ROUTE = (req, res, next) => {
  // Create the DB file if it doesn't exist yet
  routes_db.get("routes").remove({ id: req.body.id }).write();

  res
    .status(200)
    .send(
      JSON.stringify({
        status: "Success",
        msg: "Route has been successfully removed",
      })
    );

  logger.info({
    level: "info",
    time: new Date(),
    message: "Route with ID " + req.body.id + " has been removed",
  });
};

module.exports = DELETE_ROUTE;
