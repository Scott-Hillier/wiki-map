const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //@@ public route api/maps
  //get all maps
  router.get("/", (req, res) => {
    const queryString = `
    SELECT * FROM maps WHERE isPrivate = 0;
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

  //@@ public route api/maps
  //get a registered user's maps
  router.get("/:userId", (req, res) => {
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
