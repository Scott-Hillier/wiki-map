module.exports = (db) => {
  const createMap = (userId) => {
    const queryParams = [userId];
    const queryString = `
    SELECT * FROM users WHERE id = $1;
    `;

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

  return { createMap };
};
