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
        `SELECT * FROM favourites JOIN maps ON map_id = maps.id WHERE favourites.user_id = $1 AND isFavorite = $2 ORDER BY maps.id;`,
        [user_id, isFavourite]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getContributorProfileMaps = function (user_id, isContributed) {
    return db
      .query(
        `SELECT * FROM contributions JOIN maps ON map_id = maps.id WHERE contributions.user_id = $1 AND isContributed = $2;`,
        [user_id, isContributed]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  return { getProfileMaps, getFavoriteProfileMaps, getContributorProfileMaps };
};
