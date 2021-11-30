const express = require("express");
const router = express.Router();
const { addPoint, getSinglePoint } = require("../db-helper/point.helper");
const pointDataHelper = require("../db-helper/point.helper");

module.exports = (db) => {
  const { getPointsWithMapId } = pointDataHelper(db);

  //@@ private route /points
  //auth user adds a point in a map
  router.post("/new-point", (req, res) => {
    addPoint(req.body, db).then((data) => res.json(data));
  });

  //@@ public route /points
  //get all point from a map
  router.get("/:mapId", (req, res) => {
    return getPointsWithMapId(req.params.mapId).then((data) => res.json(data));
  });

  //@@ public route /points
  //get a point with map ID && point ID
  router.get("/:mapId/:pointId", (req, res) => {
    getSinglePoint(req.session.mapId, req.body.pointId, db).then((data) =>
      res.json(data)
    );
  });

  //@@ private route /points
  // auth user deletes a point with map ID && point ID
  router.delete("/:mapId/:pointId", (req, res) => {
    deletePoint(req.body.pointId, db).then((data) => res.json(data));
  });

  return router;
};
