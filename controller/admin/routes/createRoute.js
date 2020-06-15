const logger = require("../../../middleware/logger");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { response } = require("express");

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

const CREATE_ROUTE = (req, res, next) => {
  // Create the DB file if it doesn't exist yet
  console.log("This creates a route");

  routes_db.defaults({ routes: [] }).write();

  routes_db.get("routes").push(req.body).write();

  res.status(200).send(JSON.stringify({status : "Success", msg: "Route has been successfully saved top the DB"}))
};

module.exports = CREATE_ROUTE;
