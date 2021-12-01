/* eslint-disable camelcase */
module.exports = (db) => {
  const getPointsWithMapId = (mapId) => {
    const queryString = `
    SELECT * FROM points WHERE map_id = ${mapId}
    `;
    return db
      .query(queryString)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  const getPointWithMapAndPointId = (mapId, pointId) => {
    const queryString = `
    SELECT * FROM points WHERE map_id = ${mapId} AND id = ${pointId};
    `;
    return db
      .query(queryString)
      .then((result) => result.rows[0])
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  const addPoint = ({
    title,
    description,
    imageUrl,
    address,
    type,
    latitude,
    longitude,
    mapId,
  }) => {
    const queryString = `
      INSERT INTO points(map_id, title, description, image, latitude, longitude, address, type)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `;
    const queryParams = [
      mapId,
      title,
      description,
      imageUrl,
      latitude,
      longitude,
      address,
      type,
    ];
    return db
      .query(queryString, queryParams)
      .then((res) => res.rows[0])
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  // point is an object with the changes the user wants to implement
  const editPoint = (point, point_id) => {
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

  const deletePoint = (point_id) => {
    console.log("inside deletePoint func");
    return db
      .query(`DELETE FROM points WHERE id = $1;`, [point_id])
      .then((res) => res.rows)
      .catch((err) => console.log(err.message));
  };

  return {
    getPointsWithMapId,
    getPointWithMapAndPointId,
    addPoint,
    editPoint,
    deletePoint,
  };
};
