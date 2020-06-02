const logger = require("../../middleware/logger");

/*
 * @desc        This controller takes care of handling the middleman response
 *              of a successful request and response - relation towards the 
 *              OData server. If a different http status was returned, the 
 *              controller will send the reply to the client and log it.
 * @requires    res,        The res - object to send the data to the requesting client
 *              response,   The response object returned by the OData server
 *              status      The desired HTTP Status upon which to send s success - object 
 * @response    200: {status, headers, config, data}
 *              err: {status, msg, data}
 */

const HANDLE_RESPONSE = (res, response, status) => {
  let date = new Date();

  let oData = {
    status: response.status,
    headers: response.headers,
    config: response.config,
    data: response.data,
  };

  if (oData.status === status) {
    res.send(oData);
    logger.info({
      level: "Info",
      message: date + " - Data successfully returned - " + oData.status,
    });
  } else {
    res.send({ status: "Error", msg: "A different status than expected was returned", data: response });
    logger.error({
      level: "Error",
      message: date + " A different status than expected was returned" + response
    });
  }
};

module.exports = HANDLE_RESPONSE;
