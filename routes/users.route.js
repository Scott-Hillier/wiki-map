/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const userDataHelper = require("../db-helper/user.helper");
const mapDataHelper = require("../db-helper/map.helper");

// const checkAuth = require("../auth-middleware/auth-middleware");

module.exports = (db) => {
  //load helper functions
  const { getUserWithUserId } = userDataHelper(db);
  const { getAllPublicMaps } = mapDataHelper(db);

  //@@ public route /users
  //get a registered user with user ID + render map/home page with session cookie;
  router.post("/:userId/sign-in", (req, res) => {
    getUserWithUserId(req.params.userId).then((user) => {
      if (!user) {
        return res.status(400).json("no user found");
      }
      req.session.userId = user.id;
      res.json(user);
    });
  });

  //@@ private route /users
  //sign out user and clear cookie
  router.post("/:userId/sign-out", (req, res) => {
    req.session = null;
    
    getAllPublicMaps().then((maps) => {
      res.render("index", { user: null, maps: maps });
    });
  });

  return router;
};
