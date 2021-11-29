module.exports = (db) => {
  const getAllPointsFromMap = function (db) {
    return db
      .query(
        `
        SELECT * FROM points;`
      )
      .then((result) => result.rows)
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const getSinglePoint = function (map_id, point_id, db) {
    return db
      .query(
        `
        SELECT * FROM points WHERE map_id = $1 AND id = $2;`,
        [map_id, point_id]
      )
      .then((result) => result.rows)
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  const addPoint = function (point, db) {
    return (db.query(`
    INSERT INTO points(map_id, title, description, image, latitude, longitude, address, type)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `),
    [
      point.mapId,
      point.title,
      point.description,
      point.image,
      point.latitude,
      point.longitude,
      point.address,
      point.type,
    ])
      .then((result) => result.rows[result.rows.length])
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

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

  const deletePoint = function (point_id, db) {
    return db
      .query(`DELETE FROM maps WHERE id = $1;`, [point_id])
      .then((res) => res.rows)
      .catch((err) => console.log(err.message));
  };

  return {
    getAllPointsFromMap,
    getSinglePoint,
    addPoint,
    editPoint,
    deletePoint,
  };
};
