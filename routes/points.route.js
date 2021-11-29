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
    const { mapId, pointId } = req.params;
    const queryParams = [mapId, pointId];
    const queryString = `
    GET A POINT FROM A MAP
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const userMaps = data.rows;
        res.json(userMaps);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/points
  // auth user deletes a point with map ID && point ID
  router.delete("/:mapId/:pointId", (req, res) => {
    const { mapId, pointId } = req.params;
    const queryParams = [mapId, pointId];
    const queryString = `
    DELETE A POINT FROM A MAP
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const userMaps = data.rows;
        res.json(userMaps);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
