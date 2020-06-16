// Import needed modules
const express = require("express");
const aGetRoutes = require("../../../controller/admin/routes/getRoutes");
const aCreateRoute = require("../../../controller/admin/routes/createRoute");
const aUpdateRoute = require("../../../controller/admin/routes/updateRoute");
const aDeleteRoute = require("../../../controller/admin/routes/deleteRoute");

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
router.get("/", (req, res, next) => aGetRoutes(req, res, next));

router.post("/", (req, res, next) => aCreateRoute(req, res, next));

router.patch("/", (req, res, next) => aUpdateRoute(req, res, next));

router.delete("/", (req, res, next) => aDeleteRoute(req, res, next));

module.exports = router;
