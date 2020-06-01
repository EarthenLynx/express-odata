// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");

/*
 * @desc        Get OData stream headers, config & data based on URL query
 *              URL param 'type' is optional, used to get single params from stream
 *              If types are omitted or invalid, the data will be sent by default
 * @route       GET /odata?url=[ODATA_URL]&value=[STRING]
 * @response    200: {status, headers, config, data}
 *              err: {status, msg}
 */
const DELETE_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let url = req.query.url;
  let value = req.query.value; 

  let query = url + '(' + value + ')';

  // Check if type has been specified and return only that property
  axios
    .delete(query, axios_config)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
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
        message: date + " - Error while deleting data: " + err.message,
      });
    });
};

module.exports = DELETE_ODATA;
