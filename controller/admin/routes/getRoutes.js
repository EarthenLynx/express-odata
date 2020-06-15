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

const GET_ROUTES = (req, res, next) => {
  const payload = routes_db.get("routes").value();
  res.send(payload)
};

module.exports = GET_ROUTES;
