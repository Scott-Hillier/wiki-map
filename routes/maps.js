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
  //get a registered user's maps with user ID
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

  //@@ public route api/maps
  //get a map with map ID
  router.get("/:mapId", (req, res) => {
    const mapId = req.body.mapId;
    const queryParams = [mapId];
    const queryString = `
    GET A MAP
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const map = data.rows;
        res.json(map);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/maps
  //auth user creates a map
  router.post("/new-map", (req, res) => {
    const userId = req.body.userId;
    const queryParams = [userId];
    const queryString = `
    CREATE MAP
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
  //auth user deletes a map with map ID
  router.delete("/:mapId", (req, res) => {
    const mapId = req.body.mapId;
    const queryParams = [mapId];
    const queryString = `
    DELETES MAP
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        console.log(data);
        res.json("map deleted");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
  return router;
};
