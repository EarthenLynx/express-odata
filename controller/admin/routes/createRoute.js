const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("routes_db.json");
const routes_db = low(adapter);

const CREATE_ROUTE = (req, res, next) => {
  // Create the DB file if it doesn't exist yet
  console.log("This create route");
  
  routes_db.defaults({ routes: [] }).write();

  routes_db.get("routes").push(req.body).write();
  res.send({"msg": "received request"})
  // Add a post
//   db.get("routes").push({ id: 1, title: "lowdb is awesome" }).write();
};

module.exports = CREATE_ROUTE;
