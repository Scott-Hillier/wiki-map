/* eslint-disable camelcase */
module.exports = (db) => {
  const getProfileMaps = (user_id) => {
    return db
      .query(
        `SELECT * FROM profiles JOIN maps ON map_id = maps.id WHERE profiles.user_id = $1`,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getFavoriteProfileMaps = (user_id) => {
    return db
      .query(
        `SELECT * FROM favorites JOIN maps ON map_id = maps.id WHERE favorites.user_id = $1 AND isFavorite = 'true' ORDER BY maps.id;`,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getContributorProfileMaps = (user_id, isContributed) => {
    return db
      .query(
        `SELECT * FROM contributions JOIN maps ON map_id = maps.id WHERE contributions.user_id = $1 AND isContributed = $2;`,
        [user_id, isContributed]
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const setAsContributor = (userId, mapId) => {
    const queryString = `
      INSERT INTO contributions (user_id, map_id, iscontributed)
      SELECT ${userId}, ${mapId}, true
      WHERE NOT EXISTS (SELECT * FROM contributions WHERE user_id = ${userId} AND map_id =  ${mapId})
      RETURNING *
    `;
    return db
      .query(queryString)
      .then((data) => {
        if (!data) {
          return "user is already contributor";
        }
        return data.rows[0];
      })
      .catch((err) => `contribution helper message: ${err.message}`);
  };

  return {
    getProfileMaps,
    getFavoriteProfileMaps,
    getContributorProfileMaps,
    setAsContributor,
  };
};
