// Import needed modules
const express = require("express");
const mGetProperties = require("../../controller/metadata/getProperties");

// Setup the router
var router = express.Router();

/*
 * @desc    GET REQUESTS
 *          The following entries describe all GET - routes for the service. 
 * @routes  ("/")       : Base Route to get all data as json from a given URL
 *          params      : {url[required], type[optional]}
 * TODO:    ("/query")  : Perform a query against the OData service 
 */
// Get the data stream from a given URL
router.get("/props", (req, res, next) => {
  mGetProperties(req, res, next);
});

module.exports = router;
