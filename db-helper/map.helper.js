module.exports = (db) => {
  const getAllPublicMaps = (userId) => {
    let queryString;
    if (userId) {
      queryString = `
      SELECT * FROM maps WHERE isPrivate = FALSE OR user_id = $1
      `;
    } else {
      queryString = `
      SELECT * FROM maps WHERE isPrivate = FALSE
      `;
    }
    const queryParams = [userId];
    return db
      .query(queryString, queryParams)
      .then((res) => res.rows)
      .catch((err) => console.log(err.message));
  };

  const createMap = (userId, mapName, isPrivate) => {
    const queryString = `
      INSERT INTO maps (user_id, name, isPrivate )
      VALUES ($3, $1, $2)
      RETURNING *;
      `;
    const queryParams = [userId, mapName, isPrivate];
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

<<<<<<< HEAD
  const getIsFavorite = (mapId) => {
    return db
      .query(`SELECT * FROM maps FULL JOIN favourites ON maps.id = $1;`, [
        mapId,
      ])
      .then((res) => res.rows)
      .catch((err) => console.log(err));
  };

  // const favoriteThisMap = (user_id, map_id) => {
  //   if (
  //     db
  //       .query(
  //         `SELECT isfavorite FROM favourites WHERE user_id = $1 AND map_id = $2;`,
  //         [user_id, map_id]
  //       )
  //       .then((res) => res.rows)
  //   ) {
  //     return db
  //       .query(
  //         `UPDATE favourites SET isfavorite = FALSE WHERE user_id = $1 AND map_id = $2 RETURNING*;`,
  //         [user_id, map_id]
  //       )
  //       .then((res) => res.rows)
  //       .catch((err) => console.log(err.message));
  //   } else {
  //     return db
  //       .query(
  //         `UPDATE favourites SET isfavorite = TRUE WHERE user_id = $1 AND map_id = $2 RETURNING*;`,
  //         [user_id, map_id]
  //       )
  //       .then((res) => res.rows)
  //       .catch((err) => console.log(err.message));
  //   }
  // };

  //===============================
  // const getAllAvailableMaps = () => {
  //   return db
  //     .query(
  //       `
  //       SELECT * FROM maps WHERE isPrivate = FALSE;`
  //     )
  //     .then((result) => result.rows)
  //     .catch((err) => console.log(err.message));
  // };

  // const getUserMaps = (user_id) => {
  //   return db
  //     .query(
  //       `
  //     SELECT * FROM maps WHERE user_id = $1;`,
  //       [user_id]
  //     )
  //     .then((result) => result.rows)
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // };

  // const deleteMap = (map_id) => {
  //   return db
  //     .query(`DELETE FROM maps WHERE map_id = $1;`, [map_id])
  //     .then((result) => result.rows)
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // };

=======
>>>>>>> master
  return {
    getAllPublicMaps,
    createMap,
    getMapWithMapId,
<<<<<<< HEAD
    getIsFavorite,
    // favoriteThisMap,
    // getUserMaps,
    // deleteMap,
=======
>>>>>>> master
  };
};
