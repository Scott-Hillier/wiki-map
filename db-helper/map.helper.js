/* eslint-disable camelcase */
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

  // const getSingleMap = (map_id) => {
  //   return db
  //     .query(
  //       `
  //     SELECT * FROM maps WHERE id = $1;`,
  //       [map_id]
  //     )
  //     .then((result) => result.rows[0])
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // };

  // const createMap = (options) => {
  //   return db
  //     .query(
  //       `INSERT INTO maps(user_id, name, isPrivate)
  //       VALUES($1, $2, $3)
  //       RETURNING *;`,
  //       [options.user_id, options.name, options.isPrivate]
  //     )
  //     .then((result) => result.rows[result.rows.length])
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

  // const favoriteMap = (map_id, status) => {
  //   return db
  //     .query(`UPDATE profiles SET isFavorite = $1 WHERE id = $2;`, [
  //       status,
  //       map_id,
  //     ])
  //     .catch((err) => console.log(err.message));
  // };

  return {
    getAllPublicMaps,
    // getAllAvailableMaps,
    // getUserMaps,
    // getSingleMap,
    // createMap,
    // deleteMap,
    // favoriteMap,
  };
};
