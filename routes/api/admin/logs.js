// Import needed modules
const express = require("express");
const aGetComLog = require("../../../controller/admin/logs/getCombinedLog")
const aGetErrLog = require("../../../controller/admin/logs/getErrLog");

// Setup the router
var router = express.Router();

/*
 * @desc      This route is responsible to return routes related to 
 *            logs of the server. The controls read the winston logs
 *            and return them in json format
 *          
 * @routes    ("/combined")       : Returns the combined logs as json
 *            ("error")           : Returns the error logs as json
 * 
 * @response  {
 *              level: String,    : info or error
 *              time: Date,       : Date on which entry was logged
 *              message: String   : Logged message
 *            }
 * 
 */

// Return the combined log
router.get("/combined", (req, res, next) => {
  aGetComLog(res, res, next)
}); 

// Return the error log
router.get("/error", (req, res, next) => {  
  aGetErrLog(req, res, next);
});

module.exports = router;
