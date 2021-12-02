const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth-middleware/auth-middleware");
const contributionDataHelper = require("../db-helper/contributions.helper");

module.exports = (db) => {
  const { setAsContributorWithUserIdAndMapId } = contributionDataHelper(db);

  //@@ private /contributions
  // set user as contribution upon adding point on map
  router.post("/:mapId", authMiddleware, (req, res) => {
    setAsContributorWithUserIdAndMapId(req.session.userId, req.params.mapId)
      .then((data) => {
        if (!data) {
          return res.end();
        }
        res.json(data);
      })
      .catch((err) => res.json(err.message));
  });

  return router;
};
