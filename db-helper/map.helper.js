module.exports = (db) => {
  const getAllMaps = function (db) {
    return db
      .query(
        `
        SELECT * FROM maps;`
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getAllAvailableMaps = function (db) {
    return db
      .query(
        `
        SELECT * FROM maps WHERE isPrivate = FALSE;`
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  const getUserMaps = function (user_id, db) {
    return db
      .query(
        `
      SELECT * FROM maps WHERE user_id = $1;`,
        [user_id]
      )
      .then((result) => result.rows)
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const getSingleMap = function (map_id, db) {
    return db
      .query(
        `
      SELECT * FROM maps WHERE id = $1;`,
        [map_id]
      )
      .then((result) => result.rows[0])
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const createMap = function (options, db) {
    return db
      .query(
        `INSERT INTO maps(user_id, name, isPrivate)
        VALUES($1, $2, $3)
        RETURNING *;`,
        [options.user_id, options.name, options.isPrivate]
      )
      .then((result) => result.rows[result.rows.length])
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const deleteMap = function (map_id, db) {
    return db
      .query(`DELETE FROM maps WHERE map_id = $1;`, [map_id])
      .then((result) => result.rows)
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const favoriteMap = function (map_id, status, db) {
    return db
      .query(`UPDATE profiles SET isFavorite = $1 WHERE id = $2;`, [
        status,
        map_id,
      ])
      .catch((err) => console.log(err.message));
  };

  return {
    getAllMaps,
    getAllAvailableMaps,
    getUserMaps,
    getSingleMap,
    createMap,
    deleteMap,
    favoriteMap,
  };
};
