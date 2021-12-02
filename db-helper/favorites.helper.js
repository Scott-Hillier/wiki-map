module.exports = (db) => {
  const setAsFavorite = (userId, mapId) => {
    const queryString = `
      INSERT INTO favourites (user_id, map_id, isfavorite)
      SELECT $1, $2, true
      WHERE NOT EXISTS (SELECT * FROM contributions WHERE user_id = $1 AND map_id =  $2)
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
      .catch((err) => `favorite helper message: ${err.message}`);
  };

  return { setAsFavorite };
};
