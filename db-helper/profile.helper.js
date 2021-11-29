module.exports = (db) => {
  const getProfileMaps = function (user_id, db) {
    return db.query(
      `SELECT DISTINCT id, user_id, map_id, name, isContributor, isPrivate
      FROM profiles
      JOIN maps ON map_id = maps.id
      WHERE user_id = $1;`,
      [user_id]
    );
  };

  const getFavoriteProfileMaps = function (user_id, db) {
    return db.query(
      `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE user_id = $1 AND isFavorite = $2;`,
      [user_id, true]
    );
  };

  const getContributorProfileMaps = function (user_id, db) {
    return db.query(
      `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE user_id = $1 AND isContributor = $2;`,
      [user_id, true]
    );
  };

  return { getProfileMaps, getFavoriteProfileMaps, getContributorProfileMaps };
};
