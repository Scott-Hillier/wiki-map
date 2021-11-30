/* eslint-disable camelcase */
module.exports = (db) => {
  const getProfileMaps = function (user_id) {
    return db
      .query(
        `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE profiles.user_id = $1`,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getFavoriteProfileMaps = function (user_id, isFavourite) {
    return db
      .query(
        `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE profiles.user_id = $1 AND isFavorite = $2;`,
        [user_id, isFavourite]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getContributorProfileMaps = function (user_id, isContributor) {
    return db
      .query(
        `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE profiles.user_id = $1 AND isContributor = $2;`,
        [user_id, isContributor]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  return { getProfileMaps, getFavoriteProfileMaps, getContributorProfileMaps };
};
