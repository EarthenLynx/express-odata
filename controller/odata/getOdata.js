// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger"); 
const handleResponse = require("../helpers/handleResponse");

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
      .then((response) => {
        let jsonData = "";
        switch (section) {
          case "headers":
            jsonData = response.headers;
            break;
          case "config":
            jsonData = response.config;
            break;
          default:
            jsonData = response.data;
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
      .then((response) => {
        handleResponse(res, response, 200);
      })
      .catch((err) => {
        res.send({ status: "Error", msg: err.message });
        let date = new Date();
        logger.error({
          level: "error",
          message: date + " - Error while getting data: " + err.message,
        });
      });
  }
};

module.exports = GET_ODATA;
