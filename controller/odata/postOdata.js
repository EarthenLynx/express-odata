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
 * @response  200: {status, header, config, data}
 *            err: {status, msg}
 */
const POST_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let oUrl = req.query.url;
  let oType = req.query.type;

  // Append the odata type
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
