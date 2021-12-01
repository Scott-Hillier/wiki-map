/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const onPopupOpen = () => {
  $(".marker-edit-button").on("click", () => {
    const pointId = $(".point-id").text();
    const mapId = $(".map-id").text();

    $.ajax({ type: "GET", url: `points/${mapId}/${pointId}` }).then((data) => {
      $("#point-title").val(data.title);
      $("#point-description").val(data.description);
      $("#point-image-url").val(data.image);
      $("#point-address").val(data.address);
      $("#point-type").val(data.type);
    });
  });

  $(".marker-delete-button").on("click", () => {
    const pointId = $(".point-id").text();
    const mapId = $(".map-id").text();
    console.log("delete button clicked:", pointId, mapId);

    $.ajax({ type: "DELETE", url: `/points/${mapId}/${pointId}` }).then(() => {
      window.location.reload();
    });
  });
};

const tempMarkerPopupOpen = (map, mapId) => (event) => {
  $(".tempMarker-add-button").on("click", () => {
    console.log(event);
    $(".temp-marker-add-form").on("submit", (e) => {
      e.preventDefault();
      const latitude = $(".point-lat").val();
      const longitude = $(".point-lng").val();

      //clear form upon displaying form
      $("#point-title").val("");
      $("#point-description").val("");
      $("#point-image-url").val("");
      $("#point-address").val("");
      $("#point-type").val("");

      $(".point-submission-box").toggleClass("display");

      $("#point-latitude").val(latitude);
      $("#point-longitude").val(longitude);
      $("#point-mapId").val(mapId);

      console.log(latitude, longitude);
    });
  });

  $(".tempMarker-delete-button").on("click", () => {
    map.removeLayer(event.target);
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
      <input type='button' value='Delete' class='marker-delete-button' />
      `
    );
    // set listener to marker
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
  //set listener to new-map button =================
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

  //display map ======================================
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

      const onRightClick = (event) => {
        console.log(event.latlng);
        const tempMarker = new L.marker(event.latlng).addTo(map);
        tempMarker.on("popupopen", tempMarkerPopupOpen(map, mapData.id));
        tempMarker
          .bindPopup(
            `
            <form class="temp-marker-add-form" style="display: inline-block; margin-right: 5px;">
            <input value=${event.latlng.lat} class="point-lat" hidden />
            <input value=${event.latlng.lng} class="point-lng" hidden />
            <input type='submit' value='Add' class='tempMarker-add-button' />
            </form>
            <input type='button' value='Delete' class='tempMarker-delete-button' />
          `
          )
          .openPopup();
      };

      //add listner for right click
      map.on("contextmenu", onRightClick);
    });
  });
});
