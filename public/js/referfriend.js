function copyCode() {
  var copyText = document.getElementById("link");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  let code = copyText.value;
}

$(document).ready(function () {
  //handle responsiveness of navbar onload
  $("#search-sm").hide();
  if ($(window).width() < 992) {
    $("span.profile").toggleClass("dropdown dropup");
    $(".notif").removeClass("dropdown-menu-right");
    $(".search-icon").hide();
    $("#search-sm").show();
  } else {
    $(".notif").addClass("dropdown-menu-right");
    $(".search-icon").show();
    $("#search-sm").hide();
  }
  $("#search-bar").hide();
  $(".search-icon").click(function () {
    $(this).css("display", "none");
    $("#search-bar").show();
    $("#search-bar").css("margin-right", "-20px");
  });
});
