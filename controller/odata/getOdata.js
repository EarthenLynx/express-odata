// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger"); 

/*
 * @desc        Get OData stream headers, config & data based on URL query
 *              URL param 'type' is optional, used to get single params from stream
 *              If types are omitted or invalid, the data will be sent by default
 * @route       GET /odata?url=[ODATA_URL]&type=[TYPE] 
 * @response    200: {status, headers, config, data}
 *              err: {status, msg}
 */
const GET_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let url = req.query.url;
  let type = req.query.type;

  // Check if type has been specified and return only that property
  if (type) {
    axios
      .get(url, axios_config)
      .then((response) => {
        let jsonData = "";
        switch (type) {
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

    // If no type was specified, return all four properties
  } else {
    axios
      .get(url, axios_config)
      .then((response) => {
        
        let jsonData = {
          status: response.status,
          headers: response.headers,
          config: response.config,
          data: response.data,
        };

        if (jsonData.status === 200) {
          res.send(jsonData);
        } else {
          console.error("Something went wrong while fetching data");
        } /* ... Additional error handling ... */
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
