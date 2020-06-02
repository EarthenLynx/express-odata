// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");
const handleResponse = require("../helpers/handleResponse");

/*
 * @desc        Delete a OData resource based on a given oKey in the URL.
 *              Depending on the service targetted, the response body
 *              might be empty and therefor return a status code of
 *              204
 *
 * @route       GET /odata?url=[ODATA_URL]&oKey=[STRING]
 *
 * @response    200 / 204:  {status, msg} when deletion has been successful
 *              err:        {status, msg}
 */
const DELETE_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let oUrl = req.query.url;
  let oKey = req.query.key;

  // Build the OData query to be sent
  let oQuery = oUrl + "(" + oKey + ")";

  // Check if type has been specified and return only that property
  axios
    .delete(oQuery, axios_config)
    .then((response) => {
      handleResponse(res, response, 204)
    })
    .catch((err) => {
      res.send({ status: "Error", msg: err.message });
      let date = new Date();
      logger.error({
        level: "Error",
        message: date + " - Error while deleting data: " + err.message,
      });
    });
};

module.exports = DELETE_ODATA;
