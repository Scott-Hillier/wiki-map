/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const onPopupOpen = () => {
  $(".marker-edit-button").on("click", () => {
    const pointId = $(".point-id").text();
    const mapId = $(".map-id").text();
    console.log("map and point:", mapId, pointId);

    $.ajax({ type: "GET", url: `points/${mapId}/${pointId}` }).then((data) =>
      console.log(data)
    );
  });
};

const getMarkerArr = (pointArr) => {
  const markerArr = pointArr.map((point) => {
    const markerToAdd = L.marker([point.latitude, point.longitude]).bindPopup(
      `<b>${point.title}</b><br>
      ${point.address}<br>
      <input type='button' value='Edit' class='marker-edit-button' />
      <span class="point-id" style="display: none;">${point.id}</span>
      <span class="map-id" style="display: none;">${point.map_id}</span>
      `
    );
    markerToAdd.on("popupopen", onPopupOpen);

    return markerToAdd;
  });
  return markerArr;
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
  $(".new-map").on("submit", (event) => {
    event.preventDefault();

    const mapName = $("#new-map-name").val();
    const privateOption = $("#private-option").val();

    $.ajax({
      type: "POST",
      url: "/maps/new",
      data: { mapName, privateOption },
    }).then(() => (document.location.href = "/"));
  });

  const onRightClick = (event) => {
    const marker = new L.marker(event.latlng).addTo(map);
    const popup = L.popup({ minWidth: 300 })
      .setLatLng(event.latlng)
      .setContent("You right-clicked at: " + event.latlng.toString());

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

  let map;
  map = startMap();

  $(".map-item-box").on("submit", (event) => {
    event.preventDefault();
    const mapId = event.target.querySelector("input").value;

    Promise.all([
      $.ajax({ type: "GET", url: `/maps/${mapId}` }),
      $.ajax({ type: "GET", url: `/points/${mapId}` }),
    ]).then((data) => {
      const mapData = data[0];
      const pointArr = data[1];

      //rerender map
      map.remove();
      map = startMap(mapData, pointArr);
      //add listner for right click
      map.on("contextmenu", onRightClick);
    });
  });
});
