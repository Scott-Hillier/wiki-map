module.exports = (db) => {
  const getProfileMaps = function (user_id, db) {
    return db.query(`SELECT * FROM profiles WHERE user_id = $1;`, [user_id]);
  };

  return { getProfileMaps };
};
