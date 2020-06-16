// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc        Delete a OData resource based on a given oKey in the URL.
 *              Depending on the service targetted, the response body
 *              might be empty and therefor return a status code of
 *              204. Therefor, make sure to have the route tested and the status 
 *              passed to the helper function adjusted
 *
 * @route       GET /odata?url=[ODATA_URL]&oKey=[OKEY]
 *
 * @requires    1. REQUIRED | url=[ODATA_URL]:  | The URL of the OData service 
 *              2. REQUIRED | key=[OKEY]       | The Key of the OData entity to be deleted, e.g. a unique ID or name.
 * 
 * @response    200 / 204:  {status, msg} when deletion has been successful
 *              err:        {status, msg}
 * 
 * @issues
 * //FIXME:    Newly created entities ( from the server ) cannot be deleted and throw a 400 bad request error
 *             ( only for the first API key, for the 2nd this did not occur ), could be an issue with integrity
 * //TODO:     Change the status of the helper function before moving to a production environment
 */
const DELETE_ODATA = (req, res, next) => {
  // Get the Odata Path and the key from the URL
  let oUrl = req.query.url;
  let oKey = req.query.key;

  // Build the OData URL - query to be sent
  let oQuery = oUrl + "(" + oKey + ")";

  // Send the delete request and pass the response to the helper function
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
