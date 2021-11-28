/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { render } = require("sass");
const router = express.Router();

// const checkAuth = require("../auth-middleware/auth-middleware");

module.exports = (db) => {
  //@@ public route api/users
  //get all users
  router.get("/", (req, res) => {
    console.log("HEY");
    const queryString = `
    SELECT * FROM users;
    `;

    db.query(queryString)
      .then((data) => {
        const users = data.rows;
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // //@@ public route api/
  // //registere a user + render map/home page with session cookie;
  // FOR 5MIN DEMO, USER SIGN UP IS OMMITED

  //@@ public route api/users
  //get a registered user with user ID + render map/home page with session cookie;
  router.get("/:userId/sign-in", (req, res) => {
    const queryParams = [req.params.userId];
    const queryString = `
    SELECT * FROM users WHERE id = $1;
    `;
    db.query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        res.json(user);
        req.session.userId = req.params.userId;
        console.log(req.session.userId);
        render("index");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/users
  //sign out user and clear cookie
  router.get("/:userId/sign-out", (req, res) => {
    req.session = null;
    res.send("user has signed out");
  });

  return router;
};
