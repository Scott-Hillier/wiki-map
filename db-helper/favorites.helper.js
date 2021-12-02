module.exports = (db) => {
  // if record does not exist, create new record and set map as favorite
  const setAsFavorite = (userId, mapId) => {
    const queryString = `
      INSERT INTO favorites (user_id, map_id, isfavorite)
      SELECT $1, $2, true
      WHERE NOT EXISTS (SELECT * FROM favorites WHERE user_id = $1 AND map_id =  $2)
      RETURNING *
    `;
    const queryParams = [userId, mapId];
    return db
      .query(queryString, queryParams)
      .then((data) => {
        if (!data) {
          return "already favourited";
        }
        return data.rows[data.length];
      })
      .catch((err) => err.message);
  };

  const removeFavorite = (userId, mapId) => {
    const queryString = `
    DELETE FROM favorites
    WHERE user_id = $1 AND map_id =  $2
    RETURNING *
  `;
    const queryParams = [userId, mapId];
    return db
      .query(queryString, queryParams)
      .then((data) => {
        if (!data) {
          return "favorite already deleted";
        }
        return data.rows[data.length];
      })
      .catch((err) => err.message);
  };

  return { setAsFavorite, removeFavorite };
};
