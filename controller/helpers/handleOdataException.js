const logger = require("../../middleware/logger");

/*
 * @desc        This controller takes care of handling the middleman response
 *              of a failed request and response - relation towards the
 *              OData server. Compared to the 'Error' - response in the 
 *              handleODataResponse.js file, it only executes upon rejected
 *              promise from the axios function.
 * 
 * @requires    1. (res),        The res - object to send the data to the requesting client
 *              2. (err),        The error object returned by the OData server
 * 
 * @response    err: {status, msg}
 */

const HANDLE_EXCEPTION = (res, err) => {
  let date = new Date();

  res.send({ status: "Error", msg: err.message });
  logger.error({
    level: "error",
    message: date + " - Error while posting data: " + err.message,
  });
};

module.exports = HANDLE_EXCEPTION;
