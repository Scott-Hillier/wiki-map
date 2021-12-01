module.exports = (db) => {
  const setAsContributorWithUserIdAndMapId = (userId, mapId) => {
    const queryString = `
      IF NOT EXISTS (SELECT * FROM contributions WHERE user_id = ${userId} AND map_id = ${mapId})
      BEGIN
      INSERT INTO contributions (user_id, map_id, iscontributed)
      VALUES (${userId}, ${mapId}, true)
      RETURNING *
      END
    `;
    return db
      .query(queryString)
      .then((data) => data.rows[0])
      .catch((err) => console.log(err.message));
  };

  return { setAsContributorWithUserIdAndMapId };
};
