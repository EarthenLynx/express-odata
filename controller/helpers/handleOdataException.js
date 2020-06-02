const logger = require("../../middleware/logger");

/*
 * @desc        This controller takes care of handling the middleman response
 *              of a successful request and response - relation towards the
 *              OData server.
 * @requires    res,        The res - object to send the data to the requesting client
 *              err,        The error object returned by the OData server
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
