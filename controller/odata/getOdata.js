// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc        Get OData stream from the specified URL
 *
 * @route       GET /odata?url=[ODATA_URL]
 *
 * @requires    REQUIRED |    url=[ODATA_URL]:    | The URL of the OData service.
 *
 * @response    200: {status, headers, config, data}
 *              err: {status, msg}
 */

const GET_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let oUrl = req.query.url;

  // Send the get request and pass the response to the helper functions
  axios
    .get(oUrl, axios_config)
    .then((oResponse) => {
      handleResponse(res, oResponse, 200);
    })
    .catch((err) => {
      handleException(res, err);
    });
};

module.exports = GET_ODATA;
