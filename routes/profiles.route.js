const express = require("express");
const router = express.Router();

const userDataHelper = require("../db-helper/user.helper");
const mapDataHelper = require("../db-helper/map.helper");
const profileDataHelper = require("../db-helper/map.helper");

module.exports = (db) => {
  const { getUserWithUserId } = userDataHelper(db);
  const { getAllPublicMaps, getMapWithMapId, createMap } = mapDataHelper(db);
  const { getFavoriteProfileMaps, getContributorProfileMaps } =
    profileDataHelper(db);

  //@@ PRIVATE /maps
  // view maps page
  router.get("/profile", (req, res) => {
    getUserWithUserId(req.session.userId).then((user) => {
      res.render("profile", { user: user });
    });
  });

  //@@ PUBLIC /maps
  //get all public maps including user's maps if authenticated
  router.get("/public-maps", (req, res) => {
    getAllPublicMaps(req.session.userId).then((data) => res.json(data));
  });

  router.get("/:mapId", (req, res) => {
    return getMapWithMapId(req.params.mapId).then((map) => res.json(map));
  });

  router.post("/new", (req, res) => {
    const { mapName, privateOption } = req.body;
    createMap(req.session.userId, mapName, privateOption).then((data) => {
      if (!data) {
        return res.json({ error: "server error" });
      }
      res.end();
    });
  });

  // //@@ private route api/profiles
  // //auth user favourites/contributes a map
  // router.post("/:userId/:mapId", (req, res) => {
  //   getProfileMaps(req.session.userId, db).then((data) => res.json(data));
  // });

  // //@@ private route api/profiles
  // //get auth user's profile showing favourites and contributions
  // router.get("/:userId/favourites", (req, res) => {
  //   getFavoriteProfileMaps(req.session.userid, isFavorite, db).then((data) =>
  //     res.json(data)
  //   );
  // });

  // //@@ private route api/profiles
  // //get auth user's profile showing favourites and contributions
  // router.get("/:userId/contributions", (req, res) => {
  //   getFavoriteProfileMaps(req.session.userid, isContributor, db).then((data) =>
  //     res.json(data)
  //   );
  // });

  return router;
};
