module.exports = (db) => {
  const getUserWithUserId = (userId) => {
    const queryString = `
    SELECT * FROM users WHERE id = $1;
    `;
    const queryParams = [userId];

    return db
      .query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        return user;
      })
      .catch((err) => {
        return { error: err.message };
      });
  };

  const getUserDataUponSignIn = (userId) => {
    const queryString = `
    SELECT DISTINCT maps.id as mapid, maps.name as mapname, users.id as userid, users.name as username, isprivate, iscontributed, isfavorite
    FROM maps
    JOIN users ON users.id = maps.user_id
    LEFT OUTER JOIN contributions ON contributions.user_id = users.id 
    LEFT JOIN favourites on favourites.user_id = users.id
    WHERE (users.id = ${userId} AND isfavorite = true  ) OR (isprivate = false AND isfavorite = true )
    ORDER BY mapid
    `;
    return db
      .query(queryString)
      .then((data) => data.rows)
      .catch((err) => err.message);
  };

  return { getUserWithUserId, getUserDataUponSignIn };
};
