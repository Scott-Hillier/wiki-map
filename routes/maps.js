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
        res.json(maps);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ public route api/
  //registere a user + render map/home page with session cookie;
  router.post("/sign-up", (req, res) => {
    const { name, email, password } = req.body;
    const queryParams = [name, email, password];
    const queryString = `
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;
    `,
    queryParams;

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
    SELECT * FROM maps JOIN users ON users.id = maps.user_id WHERE users.id = $1;
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const userMaps = data.rows;
        res.json(userMaps);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/maps
  //auth user creates a map
  router.post("/new-map", (req, res) => {
    // const queryParams = [req.params.userId];
    // const queryString = `
    // SELECT * FROM maps JOIN users ON users.id = maps.user_id WHERE users.id = $1;
    // `;

    // db.query(queryString, queryParams)
    //   .then((data) => {
    //     const userMaps = data.rows;
    //     res.json(userMaps);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });

  return router;
};
