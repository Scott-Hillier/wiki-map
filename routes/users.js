/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { render } = require("sass");
const router = express.Router();
const { getAllUsers, getUserMap } = require("../db/database");

// const checkAuth = require("../auth-middleware/auth-middleware");

module.exports = (db) => {
  //@@ public route api/users
  //get all users
  router.get("/", (req, res) => {
    console.log("getAllMaps");
    getAllUsers(db).then((data) => console.log(data));
  });

  // //@@ public route api/
  // //registere a user + render map/home page with session cookie;
  // FOR 5MIN DEMO, USER SIGN UP IS OMMITED

  //@@ public route api/users
  //get a registered user with user ID + render map/home page with session cookie;
  router.get("/:userId/sign-in", (req, res) => {
    console.log("getUserMap");
    getUserMap(db).then((data) => console.log(data));
  });

  //@@ private route api/users
  //sign out user and clear cookie
  router.get("/:userId/sign-out", (req, res) => {
    req.session = null;
    res.send("user has signed out");
  });

  return router;
};
