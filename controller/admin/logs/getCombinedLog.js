const fs = require("fs");
const path = require("path");

function GET_COM_LOG(req, res, next) {
  const logPath = path.resolve(__dirname, "../../../logs");

  fs.readFile(path.join(logPath, "/combined.log"), (err, data) => {
    if (err) throw err;
    let comLog = [];

    let rawLog = Buffer.from(data, "hex").toString("utf8").split("\n");
    if (rawLog) {
      rawLog.forEach((el) => {
        if (el.length > 0) {
          comLog.unshift(JSON.parse(el.replace("\r", "")));
        }
      });
    }
    res.send(comLog);
  });
}

module.exports = GET_COM_LOG;
