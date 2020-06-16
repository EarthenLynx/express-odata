const axios = require("axios");
const axios_config = require("../../config/axios.config.js");
const logger = require("../../middleware/logger");
const convert = require("xml-js");
const fs = require("fs");
const path = require("path");

/*
 * @desc        Get OData stream entities and save them locally as json.
 *              Data will be saved in /cache folder and can be queried
 *              for DELETE and PUT requests.
 *              This service will automatically fetch the URL of the
 *              Metadata and execute another request.
 * @route       GET /ometa?url=[ODATA_URL]
 * @response    200: [{name:String, props:Object}]
 *              err: {status, msg}
 */

const GET_PROPERTIES = (req, res, next) => {
  console.log(req.query);

  let oUrl = req.query.url;
  axios
    .get(oUrl, axios_config)
    .then((response) => {
      // Assign mUrl based on which of the odata metas is available
      let mUrl = "";
      if (response.data["@odata.context"]) {
        mUrl = response.data["@odata.context"];
      } else if (response.data["odata.metadata"]) {
        mUrl = response.data["odata.metadata"];
      }

      // After meta url has been fetched, use it to return the metadata
      axios.get(mUrl).then((response) => {
        let mDataJson = JSON.parse(
          convert.xml2json(response.data, {
            compact: true,
          })
        );

        /*
         * For each of the entity data
         * Get the namespace + the entity name
         * Save these in an array
         */

        let oEntities = [];
        let namespace =
          mDataJson["edmx:Edmx"]["edmx:DataServices"]["Schema"]["_attributes"][
            "Namespace"
          ];
        let entities =
          mDataJson["edmx:Edmx"]["edmx:DataServices"]["Schema"]["EntityType"];

        entities.map((el) => {
          oEntities.push({
            name: namespace + "." + el["_attributes"]["Name"],
            props: el["Property"],
          });
        });

        res.send(JSON.stringify(oEntities));
      });
    })
    .catch((err) => {
      res.send({ status: "Error", msg: err.message });
      let date = new Date();
      logger.error({
        level: "error",
        time: date,
        message: "Error while getting identifiers: " + err.message,
      });
    });
};

module.exports = GET_PROPERTIES;
