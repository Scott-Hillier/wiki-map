const express = require("express");
const {
  addPoint,
  getAllPointsFromMap,
  getSinglePoint,
} = require("../db-helper/database");
const router = express.Router();

module.exports = (db) => {
  //@@ private route api/points
  //auth user adds a point in a map
  router.post("/:mapId/new-point", (req, res) => {
    addPoint(req.body, db).then((data) => res.json(data));
  });

  //@@ public route api/points
  //get all point from a map
  router.get("/:mapId", (req, res) => {
    getAllPointsFromMap(req.body, db).then((data) => res.json(data));
  });

  //@@ public route api/points
  //get a point with map ID && point ID
  router.get("/:mapId/:pointId", (req, res) => {
    getSinglePoint(req.body.mapId, req.body.pointId, db).then((data) =>
      res.json(data)
    );
  });

  //@@ private route api/points
  // auth user deletes a point with map ID && point ID
  router.delete("/:mapId/:pointId", (req, res) => {
    deletePoint(req.body.pointId, db).then((data) => res.json(data));
  });

  return router;
};
