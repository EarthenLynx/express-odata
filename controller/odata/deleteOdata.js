// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");

/*
 * @desc        Delete a OData resource based on a given key in the URL.
 *              Depending on the service targetted, the response body
 *              might be empty and therefor return a status code of
 *              204
 *
 * @route       GET /odata?url=[ODATA_URL]&key=[STRING]
 *
 * @response    200 / 204:  {status, msg} when deletion has been successful
 *              err:        {status, msg}
 */
const DELETE_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let url = req.query.url;
  let key = req.query.key;

  // Build the OData query to be sent
  let oQuery = url + "(" + key + ")";

  // Check if type has been specified and return only that property
  axios
    .delete(oQuery, axios_config)
    .then((response) => {
      if ((response.status === 200) | (response.status === 204)) {
        res.send({
          status: "Success",
          msg: "Successfully deleted resource with key" + key,
        });
      } else {
        let date = new Date();
        logger.error({
          level: "Error",
          message: date + " - Error while deleting data: " + err.message,
        });
      } /* ... Additional error handling ... */
    })
    .catch((err) => {
      res.send({ status: "Error", msg: err.message });
      let date = new Date();
      logger.error({
        level: "Error",
        message: date + " - Error while deleting data: " + err.message,
      });
    });
};

module.exports = DELETE_ODATA;
