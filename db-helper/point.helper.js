/* eslint-disable camelcase */
module.exports = (db) => {
  const getPointsWithMapId = (mapId) => {
    const queryString = `
    SELECT * FROM points WHERE map_id = $1
    `;
    const queryParams = [mapId];
    return db
      .query(queryString, queryParams)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log({ error: err.message });
      });
  };

  const getPointWithMapAndPointId = (mapId, pointId) => {
    const queryString = `
    SELECT * FROM points WHERE map_id = $1 AND id = $2;
    `;
    const queryParams = [mapId, pointId];
    return db
      .query(queryString, queryParams)
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
  const editPointWithPointId = (point_id, updatedPoint) => {
    const { title, description, imageUrl, address, type } = updatedPoint;
    const queryString = `UPDATE points SET title = $1, description = $2, image = $3, address = $4, type = $5 WHERE id = ${point_id} RETURNING *`;
    const queryParams = [title, description, imageUrl, address, type];

    return db
      .query(queryString, queryParams)
      .then((res) => res.rows[0])
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
    editPointWithPointId,
    deletePoint,
  };
};
