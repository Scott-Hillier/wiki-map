module.exports = (db) => {
  const setAsContributorWithUserIdAndMapId = (userId, mapId) => {
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
      .catch((err) => console.log(err.message));
  };

  return { setAsContributorWithUserIdAndMapId };
};
