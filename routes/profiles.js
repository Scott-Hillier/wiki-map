const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //@@ private route api/profiles
  //auth user favourites/contributes a map
  router.POST("/:userId/:mapId", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.params.userId;
    const queryParams = [userId, mapId];
    const queryString = `
    CHECK IF PROFILE ITEM FOR USER AND MAP EXISTS 
    AND IF IT DOES, UPDATE IT
    IF NOT, CREATE PROFILE ITEM. 
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        res.json(user);
        req.session.userId = req.params.userId;
        console.log(req.session.userId);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/profiles
  //get auth user's profile showing favourites and contributions
  router.get("/:userId/favourites", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.params.userId;
    const queryParams = [userId, mapId];
    const queryString = `
    GET USER'S FAVOURITES
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        res.json(user);
        req.session.userId = req.params.userId;
        console.log(req.session.userId);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //@@ private route api/profiles
  //get auth user's profile showing favourites and contributions
  router.get("/:userId/contributions", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.params.userId;
    const queryParams = [userId, mapId];
    const queryString = `
    GET USER'S CONTRIBUTIONS
    `;

    db.query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        res.json(user);
        req.session.userId = req.params.userId;
        console.log(req.session.userId);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
