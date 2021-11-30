/* eslint-disable no-undef */
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

});
