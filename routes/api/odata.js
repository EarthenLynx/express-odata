// Import needed modules
const express = require("express");
const oGet = require("../../controller/odata/getOdata"); 
const oPost = require("../../controller/odata/postOdata"); 

// Setup the router
var router = express.Router();

// Get the data stream from a given URL
router.get("/", (req, res, next) => {
  oGet(req, res, next);
});

// Append new data into the service URL 
router.post("/", (req, res, next) => {
  oPost(req, res, next); 
});

// Delete data from the service URL
router.delete("/", (req, res, next) => {
  OfflineAudioCompletionEvent(req, res, next)
});


module.exports = router;
