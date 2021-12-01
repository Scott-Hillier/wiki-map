/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(() => {
  $(".edit-point").on("submit", (event) => {
    event.preventDefault();

    const title = $("#point-title").val();
    const description = $("#point-description").val();
    const imageUrl = $("#point-image-url").val();
    const address = $("#point-address").val();
    const type = $("#point-type").val();
    const latitude = $("#point-latitude").val();
    const longitude = $("#point-longitude").val();
    const mapId = $("#point-mapId").val();

    console.log(
      "point info:",
      title,
      description,
      imageUrl,
      address,
      type,
      latitude,
      longitude,
      mapId
    );

    $.ajax({
      type: "post",
      url: "/points/new-point",
      data: {
        title,
        description,
        imageUrl,
        address,
        type,
        latitude,
        longitude,
        mapId,
      },
    }).then((point) => {
      $(".point-submission-box").toggleClass("display");
      console.log(point);
      window.location.reload();
    });
  });
});
