const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth-middleware/auth-middleware");
const favoriteDataHelper = require("../db-helper/favorites.helper");

module.exports = (db) => {
  const { setAsFavorite, removeFavorite } = favoriteDataHelper(db);

  //@@ private /favorites
  // set user as contribution upon adding point on map
  router.post("/:mapId/set", authMiddleware, (req, res) => {
    setAsFavorite(req.session.userId, req.params.mapId)
      .then((data) => {
        if (!data) {
          return res.end();
        }
        res.json(data);
      })
      .catch((err) => res.json(err.message));
  });

  //@@ private /favorites
  // set user as contribution upon adding point on map
  router.post("/:mapId/unset", authMiddleware, (req, res) => {
    removeFavorite(req.session.userId, req.params.mapId)
      .then((data) => {
        if (!data) {
          return res.end();
        }
        res.json(data);
      })
      .catch((err) => res.json(err.message));
  });

  return router;
};
