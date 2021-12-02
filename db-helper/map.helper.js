module.exports = (db) => {
  const getAllPublicMaps = (userId) => {
    let queryString;
    if (userId) {
      queryString = `
      SELECT * FROM maps WHERE isPrivate = FALSE OR user_id = ${userId}
      `;
    } else {
      queryString = `
      SELECT * FROM maps WHERE isPrivate = FALSE
      `;
    }

    return db
      .query(queryString)
      .then((res) => res.rows)
      .catch((err) => console.log(err.message));
  };

  const createMap = (userId, mapName, isPrivate) => {
    const queryString = `
      INSERT INTO maps (user_id, name, isPrivate )
      VALUES (${userId}, $1, ${isPrivate})
      RETURNING *;
      `;
    const queryParams = [mapName];
    return db
      .query(queryString, queryParams)
      .then((res) => res.rows[0])
      .catch((err) => console.log(err.message));
  };

  const getMapWithMapId = (mapId) => {
    return db
      .query(
        `
      SELECT * FROM maps WHERE id = $1;`,
        [mapId]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err.message));
  };

  const getUserFavorites = (userId) => {
    return db
      .query(
        `SELECT map_id FROM favourites WHERE user_id = $1 ORDER BY map_id;`,
        [userId]
      )
      .then((res) => res.rows)
      .catch((err) => console.log(err));
  };

  return {
    getAllPublicMaps,
    createMap,
    getMapWithMapId,
    getUserFavorites,
  };
};
