/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(() => {
  $(".close-point-form").on("click", () => {
    $(".point-submission-box").removeClass("display");
  });

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
    const pointId = $("#point-pointId").val();
    const update = $("#point-update").val();

    if (!update) {
      Promise.all([
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
        }),
        $.ajax({
          type: "post",
          url: `/contributions/${mapId}`,
        }),
      ])
        .then((res) => {
          cosole.log("point script then: ", res);
          $(".point-submission-box").removeClass("display");
          window.location.reload();
        })
        .catch(() => {
          alert("Please log in first");
        });
    } else {
      $.ajax({
        type: "put",
        url: `/points/${pointId}`,
        data: {
          title,
          description,
          imageUrl,
          address,
          type,
        },
      })
        .then(() => {
          $(".point-submission-box").removeClass("display");
          window.location.reload();
        })
        .catch(() => {
          alert("Please log in first");
        });
    }
  });
});
