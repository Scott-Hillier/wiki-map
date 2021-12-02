module.exports.getCombinedMapData = (allMapsArr, partialMapsArr, keyToAdd) => {
  for (const partial of partialMapsArr) {
    for (const map of allMapsArr) {
      if (partial.map_id === map.id) {
        map[keyToAdd] = true;
      }
    }
  }
  return allMapsArr;
};
