const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth-middleware/auth-middleware");

// const userDataHelper = require("../db-helper/user.helper");
const mapDataHelper = require("../db-helper/map.helper");

module.exports = (db) => {
  // const { getUserWithUserId } = userDataHelper(db);
  const { createMap, getMapWithMapId } = mapDataHelper(db);

  //@@ PRIVATE /maps
  // create map
  router.post("/new", authMiddleware, (req, res) => {
    const { mapName, privateOption } = req.body;
    createMap(req.session.userId, mapName, privateOption).then((data) => {
      if (!data) {
        return res.json({ error: "server error" });
      }
      res.end();
    });
  });

  //@@ public route api/maps
  //get a map with map ID
  router.get("/:mapId", (req, res) => {
    return getMapWithMapId(req.params.mapId).then((map) => res.json(map));
  });

  return router;
};
