// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const handleResponse = require("../helpers/handleOdataResponse");
const handleException = require("../helpers/handleOdataException");

/*
 * @desc        Get OData stream headers, config & data based on URL query
 *              URL param 'section' is optional, used to get single params from stream
 *              If types are omitted or invalid, just the data values will be sent
 * @route       GET /odata?url=[ODATA_URL]&section=[TYPE]
 * @response    200: {status, headers, config, data}
 *              err: {status, msg}
 */
const GET_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let oUrl = req.query.url;
  let section = req.query.section;

  // Check if section has been specified and return only that property
  if (section) {
    axios
      .get(oUrl, axios_config)
      .then((oResponse) => {
        let jsonData = "";
        switch (section) {
          case "headers":
            jsonData = oResponse.headers;
            break;
          case "config":
            jsonData = oResponse.config;
            break;
          default:
            jsonData = oResponse.data;
            break;
        }
        res.send(jsonData);
      })
      .catch((err) => {
        res.send({ status: "Error", msg: err.message });
      });

    // If no section was specified, return all four properties
  } else {
    axios
      .get(oUrl, axios_config)
      .then((oResponse) => {
        handleResponse(res, oResponse, 200);
      })
      .catch((err) => {
        handleException(res, err);
      });
  }
};

module.exports = GET_ODATA;
