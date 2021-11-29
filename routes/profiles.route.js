const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //@@ private route api/profiles
  //auth user favourites/contributes a map
  router.post("/:userId/:mapId", (req, res) => {
    getProfileMaps(req.session.userId, db).then((data) => res.json(data));
  });

  //@@ private route api/profiles
  //get auth user's profile showing favourites and contributions
  router.get("/:userId/favourites", (req, res) => {
    getFavoriteProfileMaps(req.session.userid, isFavorite, db).then((data) =>
      res.json(data)
    );
  });

  //@@ private route api/profiles
  //get auth user's profile showing favourites and contributions
  router.get("/:userId/contributions", (req, res) => {
    getFavoriteProfileMaps(req.session.userid, isContributor, db).then((data) =>
      res.json(data)
    );
  });

  return router;
};
