/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const onPopupOpen = () => {
  $(".marker-edit-button").on("click", () => {
    const pointId = $(".point-id").text();
    const mapId = $(".map-id").text();
    $(".new-map-submission-box").removeClass("display");

    $.ajax({ type: "GET", url: `points/${mapId}/${pointId}` }).then((data) => {
      $(".point-form-dynamic-title").text(
        "looks like someone changes their mind?"
      );
      $(".point-form-dynamic-button").text("Update");
      $(".point-submission-box").toggleClass("display");

      $("#point-title").val(data.title);
      $("#point-description").val(data.description);
      $("#point-image-url").val(data.image);
      $("#point-address").val(data.address);
      $("#point-type").val(data.type);
      $("#point-pointId").val(pointId);
      $("#point-update").val("update");
    });
  });

  $(".marker-delete-button").on("click", () => {
    const pointId = $(".point-id").text();
    const mapId = $(".map-id").text();

    $.ajax({ type: "DELETE", url: `/points/${mapId}/${pointId}` })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error status code:", err.status);
        if (err.status === 401) {
          return alert("Please log in first");
        }
      });
  });
};

const tempMarkerPopupOpen = (map, mapId) => (event) => {
  $(".tempMarker-add-button").on("click", () => {
    $(".temp-marker-add-form").on("submit", (e) => {
      e.preventDefault();
      $(".new-map-submission-box").removeClass("display");
      const latitude = $(".point-lat").val();
      const longitude = $(".point-lng").val();

      //clear form upon displaying form
      $("#point-title").val("");
      $("#point-description").val("");
      $("#point-image-url").val("");
      $("#point-address").val("");
      $("#point-type").val("");

      $(".point-form-dynamic-title").text(
        "Add one of your favourite locations"
      );
      $(".point-form-dynamic-button").text("Add");

      $(".point-submission-box").toggleClass("display");

      $("#point-latitude").val(latitude);
      $("#point-longitude").val(longitude);
      $("#point-mapId").val(mapId);
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
  }).setView([49.2527, -123.1007], 12);

  const baseMaps = { streetview };

  if (mapData) {
    L.control
      .layers(baseMaps, { [mapData.name]: overlayMapToShow })
      .addTo(mapToStart);
  }

  return mapToStart;
};

$(document).ready(() => {
  // on nav Create Map click, toggle display
  $("#nav-create-map").on("click", () => {
    $(".point-submission-box").removeClass("display");
    $(".new-map-submission-box").toggleClass("display");
  });
  $(".close-point-form").on("click", () => {
    $(".new-map-submission-box").removeClass("display");
  });

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

  $(".set-favorite-btn").on("click", (event) => {
    const mapId = event.target.querySelector("input").value;

    $.ajax({
      type: "POST",
      url: `/favorites/${mapId}/set`,
    }).then(() => (document.location.href = "/"));
  });

  $(".unset-favorite-btn").on("click", (event) => {
    const mapId = event.target.querySelector("input").value;

    $.ajax({
      type: "POST",
      url: `/favorites/${mapId}/unset`,
    }).then(() => (document.location.href = "/"));
  });

  //display map ======================================
  let map;
  map = startMap();

  $(".map-item-box").on("submit", (event) => {
    event.preventDefault();
    const mapId = event.target.querySelector("input").value;

    // highlight selected map
    $(".map-item").css("color", "");
    $(`#${mapId}`).css("color", "#33b190");

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
        const tempMarker = new L.marker(event.latlng).addTo(map);
        tempMarker.on("popupopen", tempMarkerPopupOpen(map, mapData.id));
        tempMarker
          .bindPopup(
            `<span style="font-size: 14px;">Add a point?</span><br>
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
