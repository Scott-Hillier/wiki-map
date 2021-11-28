const getAllUsers = function (db) {
  return db
    .query(
      `
      SELECT * FROM users;`
    )
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};
exports.getAllUsers = getAllUsers;

const getAllMaps = function (db) {
  return db
    .query(
      `
      SELECT * FROM maps;`
    )
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};
exports.getAllMaps = getAllMaps;

const getAllAvailableMaps = function (db) {
  return db
    .query(
      `
      SELECT * FROM maps WHERE isPrivate = FALSE;`
    )
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};
exports.getAllAvailableMaps = getAllAvailableMaps;

const getUserMap = function (mapId, db) {
  return db
    .query(
      `
    SELECT * FROM maps WHERE id = $1;`,
      [mapId]
    )
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
};
exports.getUserMap = getUserMap;

const createMap = function (options, db) {
  return db
    .query(
      `INSERT INTO maps(user_id, name, isPrivate)
      VALUES($1, $2, $3)
      RETURNING *;`,
      [options.user_id, options.name, options.isPrivate]
    )
    .catch((err) => console.log(err.message));
};
exports.createMap = createMap;

const deleteMap = function (map_id, db) {
  return db
    .query(`DELETE FROM maps WHERE map_id = $1;`, [map_id])
    .catch((err) => console.log(err.message));
};
exports.deleteMap = deleteMap;

const favoriteMap = function (map_id, status, db) {
  return db
    .query(`UPDATE profiles SET isFavorite = $1 WHERE id = $2;`, [
      status,
      map_id,
    ])
    .catch((err) => console.log(err.message));
};
exports.favoriteMap = favoriteMap;

const addPoint = function (point, map_id, db) {
  return (db.query(`
  INSERT INTO points(map_id, title, description, image, latitude, longitude, address, type)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `),
  [
    map_id,
    point.title,
    point.description,
    point.image,
    point.latitude,
    point.longitude,
    point.address,
    point.type,
  ])
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
};
exports.addPoint = addPoint;

// point is an object with the changes the user wants to implement
const editPoint = function (point, point_id, db) {
  const queryParams = [];
  let queryString = `UPDATE points`;

  if (point.title) {
    queryParams.push(point.title);
    queryString += `SET title = $2`;
  }

  if (point.description) {
    queryParams.push(point.description);
    if (queryParams.length === 0) {
      queryString += `SET description=$${queryParams.length}`;
    } else {
      queryString += `, description=$${queryParams.length}`;
    }
  }

  if (point.image) {
    queryParams.push(point.image);
    if (queryParams.length === 0) {
      queryString += `SET image=$${queryParams.length}`;
    } else {
      queryString += `, image=$${queryParams.length}`;
    }
  }

  if (point.latitude) {
    queryParams.push(point.latitude);
    if (queryParams.length === 0) {
      queryString += `SET latitude=$${queryParams.length}`;
    } else {
      queryString += `, latitude=$${queryParams.length}`;
    }
  }

  if (point.longitude) {
    queryParams.push(point.longitude);
    if (queryParams.length === 0) {
      queryString += `SET longitude=$${queryParams.length}`;
    } else {
      queryString += `, longitude=$${queryParams.length}`;
    }
  }

  if (point.address) {
    queryParams.push(point.address);
    if (queryParams.length === 0) {
      queryString += `SET address=$${queryParams.length}`;
    } else {
      queryString += `, address=$${queryParams.length}`;
    }
  }

  if (point.type) {
    queryParams.push(point.type);
    if (queryParams.length === 0) {
      queryString += `SET type=$${queryParams.length}`;
    } else {
      queryString += `, type=$${queryParams.length}`;
    }
  }

  queryParams.push(point_id);
  queryString += `WHERE id = $${queryParams.length};`;

  return db
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};
exports.editPoint = editPoint;

const deletePoint = function (point_id, db) {
  return db
    .query(`DELETE FROM maps WHERE id = $1;`, [point_id])
    .catch((err) => console.log(err.message));
};
exports.deletePoint = deletePoint;

const getProfileMaps = function (user_id, db) {
  return db.query(`SELECT * FROM profiles WHERE user_id = $1;`, [user_id]);
};
exports.getProfileMaps = getProfileMaps;
