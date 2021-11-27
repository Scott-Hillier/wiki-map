const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //@@ public route api/maps
  //get all maps
  router.get("/", (req, res) => {
    const queryString = `
    SELECT * FROM maps;
    `;

    db.query(queryString)
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ public route api/
  //registere a user + render map/home page with session cookie;
  router.post("/sign-up", (req, res) => {
    const { name, password } = req.body;
    const queryParams = [name, password];
    const queryString = `
    INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const users = data.rows;
        res.json({ users });

        req.session.userId = req.params.userId;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ public route api/users
  //get a registered user with user ID + render map/home page with session cookie;
  router.post("/:userId/sign-in", (req, res) => {
    const queryParams = [req.params.userId];
    const queryString = `
    SELECT * FROM users WHERE id = $1;
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const users = data.rows;
        res.json({ users });

        req.session.userId = req.params.userId;
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
