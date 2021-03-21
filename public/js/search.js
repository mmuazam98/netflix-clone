jQuery(".owl-carousel#carousel").owlCarousel({
  //autoplay: true,
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  autoHeight: true,
  //autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    475: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1366: {
      items: 5,
    },
  },
});

jQuery(".owl-carousel#search-carousel").owlCarousel({
  //autoplay: true,
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  autoHeight: true,
  //autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    475: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1024: {
      items: 1,
    },
    1366: {
      items: 1,
    },
  },
});
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
