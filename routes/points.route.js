const express = require("express");
const router = express.Router();
const pointDataHelper = require("../db-helper/point.helper");

module.exports = (db) => {
  const {
    getPointsWithMapId,
    getPointWithMapAndPointId,
    deletePoint,
    addPoint,
  } = pointDataHelper(db);

  //@@ private route /points
  //auth user adds a point in a map
  router.post("/new-point", (req, res) => {
    addPoint(req.body).then((data) => res.json(data));
  });

  //@@ public route /points
  //get a point with map ID && point ID
  router.get("/:mapId/:pointId", (req, res) => {
    return getPointWithMapAndPointId(req.params.mapId, req.params.pointId).then(
      (point) => {
        res.json(point);
      }
    );
  });

  //@@ public route /points
  //get all point from a map
  router.get("/:mapId", (req, res) => {
    return getPointsWithMapId(req.params.mapId).then((data) => res.json(data));
  });

  //@@ private route /points
  // auth user deletes a point with map ID && point ID
  router.delete("/:mapId/:pointId", (req, res) => {
    console.log("inside delete route reached");
    deletePoint(req.params.pointId).then((data) => res.json(data));
  });

  return router;
};
