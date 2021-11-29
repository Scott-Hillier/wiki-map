/* eslint-disable camelcase */
module.exports = (db) => {
  const getProfileMaps = (user_id) => {
    return db.query(`SELECT * FROM profiles WHERE user_id = $1;`, [user_id]);
  };

  return { getProfileMaps };
};
