const express = require("express");
const router = express.Router();

const userDataHelper = require("../db-helper/user.helper");

// const checkAuth = require("../auth-middleware/auth-middleware");

module.exports = (db) => {
  //load helper functions
  const { getUserWithUserId } = userDataHelper(db);

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

    res.redirect("/");
  });

  return router;
};
