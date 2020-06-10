const fs = require("fs");
const path = require("path");

function GET_ERR_LOG(req, res, next) {
  const logPath = path.resolve(__dirname, "../../../logs");

  fs.readFile(path.join(logPath, "/error.log"), (err, data) => {
    if (err) throw err;
    let errLog = []; 

    let rawLog = Buffer.from(data, "hex").toString("utf8").split("\n");
    rawLog.forEach((el) => {
      if (el.length > 0) {
        errLog.shift(JSON.parse(el.replace("\r", "")));
      }
    });
    
    res.send(errLog)
  });
}

module.exports = GET_ERR_LOG;
