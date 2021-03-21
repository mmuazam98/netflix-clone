//control the alignment of main image buttons
let img = document.getElementById("main-image");
let height = img.clientHeight;
let mtop = height * 0.7;

$(img).load(function () {
  let width = $(window).width();
  let height = img.clientHeight;
  let mtop = height * 0.7;
  if (width >= 700) {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "50px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "200px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  } else if (width < 700 && width > 500) {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "50px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "170px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  } else {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "30px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "125px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  }
});

$(window).resize(function () {
  let height = img.clientHeight;
  let mtop = height * 0.7;
  let width = $(window).width();
  if (width >= 700) {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "50px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "200px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  } else if (width < 700 && width > 500) {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "50px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "170px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  } else {
    $(".playNow").css({ position: "absolute", top: `${mtop}px`, left: "30px" });
    $(".moreInfo").css({ position: "absolute", top: `${mtop}px`, left: "125px" });
    $(".tempAge").css({ position: "absolute", top: `${mtop}px`, right: "0" });
  }
});
$(".logout-btn").click(function () {
  window.history.forward();
  function preventBack() {
    window.history.forward();
  }
  setTimeout(preventBack, 0);
  window.onunload = function () {
    null;
  };
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

//search-bar disabled unless some value is entered
$("#search-btn").prop("disabled", true);

$("#search").keyup(function () {
  if ($("#search").val() != " ") {
    $("#search-btn").prop("disabled", false);
  }
});

//handle responsiveness of navbar on resize
$(window).resize(function () {
  $("#search-sm").hide();
  if ($(window).width() < 992) {
    $(".profile").toggleClass("dropdown dropup");
    $(".notif").removeClass("dropdown-menu-right");
    $(".search-icon").hide();
    $("#search-sm").show();
  } else {
    $(".profile").toggleClass("dropup dropdown");
    $(".notif").addClass("dropdown-menu-right");
    $(".search-icon").show();
    $("#search-sm").hide();
  }
});

//change toggler icon onclick
$(".navbar-toggler").click(function () {
  $(this).children().toggleClass("fa-bars fa-stream");
});

//show dropdown on hover
$(".drop").hover(function () {
  $(".dropdown-toggle", this).trigger("click");
});

//change avatar
$(".dropdown-item.text-center").click(function () {
  if ($(this).children("img")) {
    let source = $(this).children("img").attr("src");
    $(".avatar").attr("src", `${source}`);
  }
});

//change background of nav onscroll
$(window).on("scroll", function () {
  let scroll_top = $(this).scrollTop();
  if (scroll_top > 100) {
    $("nav").css("background", "rgba(0, 0, 0, 0.9)");
  } else {
    $("nav").css(
      "background",
      "linear-gradient(to bottom,rgba(0, 0, 0, 0.7) 20%,rgba(0, 0, 0, 0.6) 40%,rgba(0, 0, 0, 0.4) 60%,rgba(0, 0, 0, 0.3) 70%,rgba(0, 0, 0, 0.2) 80%,rgba(0, 0, 0, 0.1) 90%,rgba(0, 0, 0, 0.03) 100%"
    );
  }
});

// owlCarousel
jQuery(".owl-carousel").owlCarousel({
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

//display main image on each face
$(document).ready(function () {
  let images = [
    {
      src: "1.jpg",
      age: "14+",
    },
    {
      src: "2.jpeg",
      age: "12+",
    },
    {
      src: "3.jpg",
      age: "16+",
    },
    {
      src: "4.jpg",
      age: "18+",
    },
    {
      src: "5.jpg",
      age: "18+",
    },
    {
      src: "6.jpg",
      age: "12+",
    },
    {
      src: "7.jpg",
      age: "13+",
    },
    {
      src: "8.jpg",
      age: "18+",
    },
    {
      src: "9.jpg",
      age: "17+",
    },
  ];
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let num = randomNumber(1, 9);
  $(".img-main").attr("src", `images/${images[num].src}`);
  $(".tempAge").html(images[num].age);
});
