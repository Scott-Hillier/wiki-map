const express = require("express");
const { render } = require("sass");
const router = express.Router();
const { addPoint, editPoint, deletePoint } = require("../db-helper/database");

module.exports = (db) => {
  // add point to map
  router.post("/something", (req, res) => {
    const point = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      type: req.body.type,
    };
    addPoint(point, map_id, db).then((data) => console.log(data));
  });

  router.post("/something", (req, res) => {
    const point = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      type: req.body.type,
    };
    editPoint(point, db).then((data) => console.log(data));
  });

  router.post("/something", (req, res) => {
    deletePoint(point_id, db).then((data) => console.log(data));
  });

  return router;
};
