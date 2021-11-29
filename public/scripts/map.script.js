// eslint-disable-next-line no-undef
$(document).ready(() => {
  const mapboxUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

  const marker1 = L.marker([49.287188, -123.07586]);
  const marker2 = L.marker([49.267825, -123.099969]);
  const vancouverLayer = L.layerGroup([marker1, marker2]);

  const testLayer = L.tileLayer(mapboxUrl, {
    maxZoom: 18,
    attribution: "Wiki Maps &copy;",
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  });

  const satellite = L.tileLayer(mapboxUrl, {
    id: "mapbox/satellite-v9",
    tileSize: 512,
    zoomOffset: -1,
    attribution: "Wiki Maps &copy;",
  });

  const map = L.map("map", {
    layers: [testLayer, satellite, vancouverLayer],
  }).setView([49.2827, -123.1207], 13);

  const baseMaps = {
    Streetview: testLayer,
    Satellite: satellite,
  };

  const overlayMaps = {
    Vancouverlayer: vancouverLayer,
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  const circle1 = L.circle([49.267825, -123.099969], {
    color: "green",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);

  const polygon1 = L.polygon([
    [49.268825, -123.097969],
    [49.26785, -123.098969],
    [49.269825, -123.090969],
  ]).addTo(map);

  marker1.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  marker2.bindPopup("<b>Hello world!</b><br>I am a good place.").openPopup();
  circle1.bindPopup("I am a circle.");
  polygon1.bindPopup("I am a polygon.");

  let popup = L.popup()
    .setLatLng([49.25785, -123.098969])
    .setContent("I am a standalone popup.")
    .openOn(map);

  const popupClick = L.popup();

  const onMapClick = (e) => {
    popupClick
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  };

  map.on("click", onMapClick);

  // var map = L.map("map", {
  //   center: [39.73, -104.99],
  //   zoom: 10,
  //   layers: [grayscale, cities],
  // });
});
