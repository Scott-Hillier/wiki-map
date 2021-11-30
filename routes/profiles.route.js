const express = require("express");
const router = express.Router();

const userDataHelper = require("../db-helper/user.helper");
// const mapDataHelper = require("../db-helper/map.helper");
const profileDataHelper = require("../db-helper/map.helper");

module.exports = (db) => {
  const { getUserWithUserId } = userDataHelper(db);
  // const { getAllPublicMaps } = mapDataHelper(db);
  const { getProfileMaps } = profileDataHelper(db);

  //@@ PRIVATE /maps
  // view maps page
  router.get("/", (req, res) => {
    getUserWithUserId(req.session.userId).then((user) => {
      res.render("profile", { user: user });
    });
  });

  //@@ PRIVATE /maps
  // view create map page
  router.get("/new", (req, res) => {
    getUserWithUserId(req.session.userId).then((user) => {
      res.render("create_map", { user: user });
    });
  });

  //@@ PUBLIC /maps
  //get all public maps including user's maps if authenticated
  router.get("/public-maps", (req, res) => {
    getProfileMaps(req.session.userId).then((data) => res.json(data));
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
