// GET the Odata from the URL
const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");
const handleResponse = require("../helpers/handleResponse");

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
  let oUrl = req.query.url;
  let oType = req.query.type;

  // Append the odata type
  let data = JSON.stringify({ "odata.type": oType, ...req.body });

  axios
    .post(oUrl, data, axios_config)
    .then((response) => {
      handleResponse(res, response, 201);
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
