// Import needed modules
const express = require("express");
const aGetLogs = require("../../../controller/admin/logs/getLogs");

// Setup the router
var router = express.Router();

/*
 * @desc  
 *          
 * @routes  
 * 
 */
// Get the data stream from a given URL
router.get("/", (req, res, next) => {  
  aGetLogs(req, res, next);
  res.send({
    msg: "It's working!"
  })
});

module.exports = router;
