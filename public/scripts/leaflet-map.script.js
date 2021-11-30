/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

const startMap = (userMapToShow) => {
  const mapboxUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
  const streetview = L.tileLayer(mapboxUrl, {
    maxZoom: 18,
    attribution: "Wiki Maps &copy;",
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  });

  const marker1 = L.marker([49.287188, -123.07586]);
  const marker2 = L.marker([49.267825, -123.099969]);
  // const overlayMapToShow = L.layerGroup([marker1, marker2]);

  const layersToShow = userMapToShow
    ? [streetview, L.layerGroup([marker1, marker2])]
    : [streetview];

  const mapToStart = L.map("map", {
    layers: layersToShow,
  }).setView([49.2827, -123.1207], 13);

  const baseMaps = { streetview };
  // const overlayMaps = { overlayMapToShow };
  if (userMapToShow) {
    L.control
      .layers(baseMaps, { [userMapToShow]: L.layerGroup([marker1, marker2]) })
      .addTo(mapToStart);
  }

  return mapToStart;
};

$(document).ready(() => {
  // marker1.bindPopup("<b>Hello world!</b><br>I am a popup.");
  // marker2.bindPopup("<b>Hello world!</b><br>I am a good place.");

  // const vancouverOverlay = L.layerGroup([marker1, marker2]);

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

    $.ajax({
      type: "GET",
      url: `/maps/${mapId}`,
    }).then((mapData) => {
      map.remove();
      console.log("startMap is gonna fire", mapData);
      map = startMap(mapData.name);
    });
  });
});
