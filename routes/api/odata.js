// Import needed modules
const express = require("express");
const oGet = require("../../controller/odata/getOdata");
const oPost = require("../../controller/odata/postOdata");
const oUpdate = require("../../controller/odata/updateOdata");
const oDelete = require("../../controller/odata/deleteOdata");

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
router.get("/", (req, res, next) => {
  oGet(req, res, next);
});

// Append new data into the service URL
router.post("/", (req, res, next) => {
  oPost(req, res, next);
});

// Update data from the serivice URL
router.put("/", (req, res, next) => {
  oUpdate(req, res, next);
})

// Delete data from the service URL
router.delete("/", (req, res, next) => {
  oDelete(req, res, next);
});

module.exports = router;
