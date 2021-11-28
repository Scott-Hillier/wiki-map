const express = require("express");
const { render } = require("sass");
const router = express.Router();
const { getProfileMaps } = require("../db-helper/database");

module.exports = (db) => {
  router.get("/something", (req, res) => {
    getProfileMaps(user_id, db).then((data) => console.log(data));
  });

  return router;
};
