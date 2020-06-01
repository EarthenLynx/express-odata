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
  let url = req.query.url;
  axios
    .get(url, axios_config)
    .then((response) => {
      let metaUrl = response.data["odata.metadata"];
      // After meta url has been fetched, use it to return the metadata
      axios.get(metaUrl).then((response) => {
        let propData = JSON.parse(
          convert.xml2json(response.data, {
            compact: true,
          })
        );
        
        // Resolve the name of the cache where data is to be stored
        let jsonPath = path.resolve(
          __dirname + "../../../cache/oEntities.json"
        );

        /*
         * For each of the entity data
         * Get the namespace + the entity name
         * Save these in an array
         */

        let pEntities = [];
        let namespace =
          propData["edmx:Edmx"]["edmx:DataServices"]["Schema"]["_attributes"][
            "Namespace"
          ];
        let jsonEntities =
          propData["edmx:Edmx"]["edmx:DataServices"]["Schema"]["EntityType"];

        jsonEntities.map((el) => {
          pEntities.push({
            name: namespace + "." + el["_attributes"]["Name"],
            props: el["Property"],
          });
        });

        // Write the result to a json file and send the object back
        fs.writeFile(jsonPath, JSON.stringify(pEntities), (err) => {
          if (err) throw err;
          res.send(JSON.stringify(pEntities));
        });
      });
    })
    .catch((err) => {
      res.send({ status: "Error", msg: err.message });
      let date = new Date();
      logger.error({
        level: "error",
        message: date + " - Error while getting identifiers: " + err.message,
      });
    });
};

module.exports = GET_PROPERTIES;
