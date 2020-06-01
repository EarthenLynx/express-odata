// GET pre-filtered data from the OData url
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");
const oFilter = require("../../classes/oFilter");

/*
 * @desc        Query OData service based on URL params
 *              URL params 'key' and 'value' must be provided. 
 *              Exact is optional and can be used to return only on exact matches.
 *              If config is omitted, request will return a 404 error
 * @route       GET /odata/filter?url=[ODATA_URL]&key=[STRING]&value=[STRING]&exact=[BOOLEAN]
 * @response    200: {data}
 *              err: {status, msg}
 */

const FILTER_ODATA = (req, res, next) => {
  let url = req.query.url;
  let key = req.query.key; 
  let value = req.query.value; 
  let exact = req.query.exact;

  let filter = new oFilter(url, "?$filter=", key, value, exact);
  let queryUrl = filter.query();

  axios
    .get(queryUrl, axios_config)
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
};

module.exports = FILTER_ODATA;
