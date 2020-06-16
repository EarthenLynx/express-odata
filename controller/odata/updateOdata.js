// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc        Update a single OData resource based on a given oKey in the URL
 *              with the data passed from the request body.
 *              Depending on the service targetted, the response body
 *              might be empty and therefor return a status code of
 *              204. Therefor, make sure to have the route tested and the status 
 *              passed to the helper function adjusted
 *
 *
 * @route       GET /odata?url=[ODATA_URL]&type=[OTYPE]&oKey=[OKEY]
 *
 * @requires    1. REQUIRED |   url=[ODATA_URL]:    | The URL of the OData service
 *              2. REQUIRED |   type=[OTYPE]:       | The OData type ( e.g. namespace + collection entity)
 *              3. REQUIRED |   key=[OKEY]          | The Key or ID of the OData entity to be updated, e.g. a unique ID or name.
 *
 * @body        {...} Object that fits the entity's dataset
 *
 * @response    200 / 204:  {status, msg} when update has been successful, the server's response will be empty
 *              err:  {status, msg}
 * 
 * @issues
 * //TODO: Change the status of the helper function before moving to a production environment
 */

const UPDATE_ODATA = (req, res, next) => {
  // Get the Odata Path, type and key from the URL
  let oUrl = req.query.url;
  let oType = req.query.type; 
  let oKey = req.query.key;

  // Build the OData URL - query to be sent
  let oQuery = oUrl + "(" + oKey + ")";

  // Append the odata type to the beginning of the body that will be sent to the server
  let data = JSON.stringify({ "odata.type": oType, ...req.body });

  // Send the patch request and pass the response to the helper functions
  axios
    .patch(oQuery, data, axios_config)
    .then((oResponse) => {      
      handleResponse(res, oResponse, 204);
    })
    .catch((err) => {
      handleException(res, err);
    });
};

module.exports = UPDATE_ODATA;
