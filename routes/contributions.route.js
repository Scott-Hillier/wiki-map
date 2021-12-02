const express = require("express");
const router = express.Router();
const contributionDataHelper = require("../db-helper/contributions.helper");

module.exports = (db) => {
  const { setAsContributorWithUserIdAndMapId } = contributionDataHelper(db);

  //@@ private /contributions
  // set user as contribution upon adding point on map
  router.post("/:mapId", (req, res) => {
    setAsContributorWithUserIdAndMapId(
      req.session.userId,
      req.params.mapId
    ).then((data) => {
      if (!data) {
        return res.end();
      }
      res.json(data);
    });
  });

  return router;
};
