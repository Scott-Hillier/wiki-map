const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // //@@ public route api/maps
  // //get all maps
  // router.get("/", (req, res) => {
  //   getAllMaps(db).then((data) => res.json(data));
  // });

  // //@@ public route api/maps
  // //get a registered user's maps with user ID
  // router.get("/:userId", (req, res) => {
  //   getUserMaps(req.body.userId, db).then((data) => res.json(data));
  // });

  // //@@ public route api/maps
  // //get a map with map ID
  // router.get("/:mapId", (req, res) => {
  //   getSingleMap(req.body.mapId, db).then((data) => res.json(data));
  // });

  // //@@ private route api/maps
  // //auth user creates a map
  // router.post("/new-map", (req, res) => {
  //   createMap(req.body, db).then((data) => res.json(data));
  // });

  // //@@ private route api/maps
  // //auth user deletes a map with map ID
  // router.delete("/:mapId", (req, res) => {
  //   deleteMap(req.body.mapId, db).then((data) => res.json(data));
  // });

  return router;
};
