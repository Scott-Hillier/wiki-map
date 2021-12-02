const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth-middleware/auth-middleware");
const pointDataHelper = require("../db-helper/point.helper");

module.exports = (db) => {
  const {
    getPointsWithMapId,
    getPointWithMapAndPointId,
    deletePoint,
    addPoint,
    editPointWithPointId,
  } = pointDataHelper(db);

  //@@ private route /points
  //auth user adds a point in a map
  router.post("/new-point", authMiddleware, (req, res) => {
    addPoint(req.body).then((data) => res.json(data));
  });

  //@@ public route /points
  //get a point with map ID && point ID
  router.get("/:mapId/:pointId", (req, res) => {
    getPointWithMapAndPointId(req.params.mapId, req.params.pointId).then(
      (point) => {
        res.json(point);
      }
    );
  });

  //@@ public route /points
  //get all point from a map
  router.get("/:mapId", (req, res) => {
    getPointsWithMapId(req.params.mapId).then((data) => res.json(data));
  });

  //@@ public route /points
  //update point ID
  router.put("/:pointId", authMiddleware, (req, res) => {
    editPointWithPointId(req.params.pointId, req.body).then((point) =>
      res.json(point)
    );
  });

  //@@ private route /points
  // auth user deletes a point with map ID && point ID
  router.delete("/:mapId/:pointId", authMiddleware, (req, res) => {
    deletePoint(req.params.pointId).then((data) => res.json(data));
  });

  return router;
};
