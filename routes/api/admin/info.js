// Import needed modules
const express = require("express");
const getAdminInfos = require("../../../controller/admin/getAdminInfos");

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
router.get("/", (req, res, next) => {
    getAdminInfos(res, res, next)
}); 


module.exports = router;
