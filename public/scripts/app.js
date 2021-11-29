/* eslint-disable no-undef */
// Client facing scripts here

// sidenav open/close
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
// }
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
// }

$(document).ready(() => {
  $.ajax({ type: "GET", url: `/maps/public-maps` }).then((mapsArr) => {
    console.log(mapsArr);
  });
});
