/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

const getMarkerArr = (pointArr) => {
  return pointArr.map((point) => {
    return L.marker([point.latitude, point.longitude]).bindPopup(
      `<b>${point.title}</b><br>${point.address}`
    );
  });
};

const startMap = (mapData, pointArr) => {
  const mapboxUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
  const streetview = L.tileLayer(mapboxUrl, {
    maxZoom: 18,
    attribution: "Wiki Maps &copy;",
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  });
  const markerArr = pointArr ? getMarkerArr(pointArr) : [];
  const overlayMapToShow = L.layerGroup(markerArr);
  const layersToShow = mapData ? [streetview, overlayMapToShow] : [streetview];
  const mapToStart = L.map("map", {
    layers: layersToShow,
  }).setView([49.2827, -123.1207], 12);

  const baseMaps = { streetview };

  if (mapData) {
    L.control
      .layers(baseMaps, { [mapData.name]: overlayMapToShow })
      .addTo(mapToStart);
  }

  return mapToStart;
};

$(document).ready(() => {
  let map;

  map = startMap();

  // const map = L.map("map", {
  //   layers: [streetview],
  // }).setView([49.2827, -123.1207], 13);

  // const baseMaps = { satellite, streetview };
  // const overlayMaps = { vancouverOverlay };

  // L.control.layers(baseMaps, overlayMaps).addTo(map);

  // const onMapClick = (e) => {
  //   const popupClick = L.popup();
  //   popupClick
  //     .setLatLng(e.latlng)
  //     .setContent("You clicked the map at " + e.latlng.toString())
  //     .openOn(map);
  // };
  // map.on("click", onMapClick);

  const onRightClick = (e) => {
    const marker = new L.marker(e.latlng).addTo(map);
    const popup = L.popup({ minWidth: 300 })
      .setLatLng(e.latlng)
      .setContent("You right-clicked at: " + e.latlng.toString());
    marker.bindPopup(popup).openPopup();

    const point = {
      mapId: 4,
      title: "testing",
      description: "test desc",
      image: "url",
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      address: "test address",
      type: "test type",
    };

    // Ajax query to save the values:
    // $.ajax({
    //   method: "POST",
    //   url: "/new-point",
    //   data: point,
    // });
  };

  map.on("contextmenu", onRightClick); // listener function

  $(".map-item-box").on("submit", (event) => {
    event.preventDefault();
    const mapId = event.target.querySelector("input").value;
    console.log("mapId: ", mapId);

    Promise.all([
      $.ajax({ type: "GET", url: `/maps/${mapId}` }),
      $.ajax({ type: "GET", url: `/points/${mapId}` }),
    ]).then((data) => {
      console.log(data);
      const mapData = data[0];
      const pointArr = data[1];
      console.log("map: ", mapData);
      console.log("coordinates: ", pointArr);

      map.remove();
      console.log("startMap is gonna fire", mapData);
      map = startMap(mapData, pointArr);
    });

    // $.ajax({
    //   type: "GET",
    //   url: `/maps/${mapId}`,
    // }).then((mapData) => {
    //   map.remove();
    //   console.log("startMap is gonna fire", mapData);
    //   map = startMap(mapData.name);
    // });
  });
});
