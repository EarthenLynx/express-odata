const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger"); 
const convert = require("xml-js");
const fs = require("fs");
const path = require("path");

/*
 * @desc        Get OData stream metadata and save them locally as json.
 *              Data will be saved in /config folder and can be queried
 *              for DELETE and PUT requests.
 * @route       GET /ometa?url=[ODATA_METADATA_URL]
 * @response    200: {status, msg}
 *              err: {status, msg}
 */

const GET_META = (req, res, next) => {
  let url = req.query.url;
  axios
    .get(url, axios_config)
    .then((response) => {
      let metaUrl = response.data["odata.metadata"];
      // After meta url has been fetched, use it to return the metadata
      axios.get(metaUrl).then((response) => {
        let jsonData = convert.xml2json(response.data, {
          compact: true,
        });
        let jsonPath = path.resolve(
          __dirname + "../../../config/metadata.json"
        );

        fs.writeFile(jsonPath, jsonData, (err) => {
          if (err) {
              
          }
          res.send({status: "Success", msg: "Metadata successfully cached"});
        });
      });
    })
    .catch((err) => {
      res.send({ status: "Error", msg: err.message });
      let date = new Date();
        logger.error({
          level: "error",
          message: date + " - Error while getting metadata: " + err.message,
        });
    });
};

module.exports = GET_META;
