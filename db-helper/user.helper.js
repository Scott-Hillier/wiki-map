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

  return { getUserWithUserId };
};
