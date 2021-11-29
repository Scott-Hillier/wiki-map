module.exports = (db) => {
  const getUserWithUserId = function (user_id, db) {
    return db
      .query(
        `
        SELECT * FROM users WHERE id = $1;`,
        [user_id]
      )
      .then((result) => result.rows[0])
      .catch((err) => console.log(err.message));
  };

  const getAllUsers = function (db) {
    return db
      .query(
        `
        SELECT * FROM users;`
      )
      .then((result) => result.rows)
      .catch((err) => console.log(err.message));
  };

  return { getUserWithUserId, getAllUsers };
};
