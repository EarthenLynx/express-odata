// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");

/*
 * @desc      Post (test) data towards the OData Server
 *            Its format depends on the targetted service
 *            URL param 'type' must be provided to keep OData integrity
 *            If omitted, service will throw a catch exception
 * @route     POST /odata?url=[ODATA_URL]&type=[TYPE]
 * @response  200: {status, header, config, data}
 *            err: {status, msg}
 */
const POST_ODATA = (req, res, next) => {
  // Get the Odata Path from the URL
  let url = req.query.url;
  let type = req.query.type;

  let data = req.body;

  // Append the odata type
  data["odata.type"] = type;

  axios
    .post(url, data, axios_config)
    .then((response) => {
      let jsonData = {
        status: response.status,
        headers: response.headers,
        config: response.config,
        data: response.data,
      };
      if (jsonData.status === 201) {
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
        message: date + " - Error while posting data: " + err.message,
      });
    });
};

module.exports = POST_ODATA;
