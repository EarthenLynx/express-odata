// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc        Delete a OData resource based on a given oKey in the URL.
 *              Depending on the service targetted, the response body
 *              might be empty and therefor return a status code of
 *              204. Therefor
 *
 * @route       GET /odata?url=[ODATA_URL]&oKey=[OKEY]
 *
 * @requires    1. REQUIRED | url=[ODATA_URL]:  | The URL of the OData service 
 *              2. REQUIRED | oKey=[OKEY]       | The Key of the OData entity to be deleted, e.g. a unique ID or name.
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
    .then((oResponse) => {
      handleResponse(res, oResponse, 204);
    })
    .catch((err) => {
      handleException(res, err);
    });
};

module.exports = DELETE_ODATA;
