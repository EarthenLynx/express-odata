/* FIXME: Old, possibly reuseable code. 
 *
 * This file uses the formidable module ( to be installed ) in order to temporarily cache an image in 
 * a pre-configured path ( tbd in const galleryPath ). Could later be used for file handling and
 * receiving / sending back and forth binary data streams
*/
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const galleryPath = require("../config/paths").galleryPath;
let tempImgUrl = path.join(galleryPath, "/tmp/temp.png");

const saveImgTemp = function (req, res, next) {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (files.img) {
      let oldpath = files.img.path;
      let newpath = tempImgUrl;
      fs.rename(oldpath, newpath, function (err) {
        res.send({
          status: 200,
          statusText: "success",
          msg: "Fileupload successful!",
        });
      });
    } else if (!files.img) {
      res.send({
        status: 304,
        statusText: "not modified",
        msg: "No file has been uploaded",
      });
    } else {
      res.send({
        status: 500,
        statusText: "error",
        msg: "File could not be uploaded to the server",
      });
    }
  });
};

module.exports = saveImgTemp;
