/* eslint-disable no-undef */
$(document).ready(() => {
  // user sign in
  console.log("header script");
  $(".sign-in-form").on("submit", (event) => {
    event.preventDefault();

    const inputValue = $(".sign-in-form >input").val();
    console.log(inputValue);
    $.ajax({ type: "POST", url: `/users/${inputValue}/sign-in` }).then(() => {
      window.location.reload(); //relaod upon sign in
    });
  });

  // user sign out
  $(".sign-out-button").on("click", (event) => {
    event.preventDefault();

    const inputValue = $(".sign-out-form >input").val();
    $.ajax({ type: "POST", url: `/users/${inputValue}/sign-out` }).then(() => {
      window.location.reload(); //relaod upon sign out
    });
  });
});
