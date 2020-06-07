// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc      Post (test) data towards the OData Server
 *            Its format depends on the targetted service
 *            URL param 'type' must be provided to keep OData integrity
 *            If omitted, service will throw a catch exception
 * 
 * @route     POST /odata?url=[ODATA_URL]&type=[TYPE]
 * 
 * @requires  1. REQUIRED | url=[ODATA_URL]:  | The URL of the OData service 
 *            2. REQUIRED | type=[TYPE]:      | The OData type ( e.g. namespace + collection entity)
 * 
 * @response  200: {status, header, config, data}
 *            err: {status, msg}
 */
const POST_ODATA = (req, res, next) => {

  // Get the Odata Path from the URL passed by the client
  let oUrl = req.query.url;
  let oType = req.query.type;

  // Append the odata type to the beginning of the body that will be sent to the server
  let data = JSON.stringify({ "odata.type": oType, ...req.body });

  axios
    .post(oUrl, data, axios_config)
    .then((oResponse) => {
      handleResponse(res, oResponse, 201);
    })
    .catch((err) => {
      handleException(res, err);
    });
};

module.exports = POST_ODATA;
