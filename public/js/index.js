$(document).ready(function () {
  let signIn = $(".signIn");
  let signInForm = $(".login");
  let signUpForm = $(".signup-form");
  let watch = $(".watch");
  let defaultView = $(".showcase-content");
  let eye = $(".field-icon");
  let sign_up = $("#showSignUp");
  let sign_in = $("#showSignIn");
  let create = $(".createNew");
  eye.hide();
  signInForm.hide();
  signUpForm.hide();

  signIn.click(function () {
    $(this).hide();
    defaultView.hide();
    signInForm.show();
  });

  watch.click(function () {
    signIn.hide();
    defaultView.hide();
    signInForm.show();
  });
  sign_up.click(function () {
    signInForm.hide();
    signUpForm.show();
    $(".loginForm")[0].reset();
  });
  sign_in.click(function () {
    signUpForm.hide();
    signInForm.show();
    $(".signupForm")[0].reset();
  });

  $("#newPassword").keydown(function () {
    $(".sign").find(eye).show();
  });
  $("#password").keydown(function () {
    $(".log").find(eye).show();
  });

  function showPassword(input) {
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }
  eye.click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");

    if ($(this).parent([2]).hasClass("sign")) {
      var input = $("#newPassword");
      showPassword(input);
    } else {
      var input = $("#password");
      showPassword(input);
    }
  });
  create.click(function () {
    signInForm.hide();
    signUpForm.show();
  });
});

$(".signup-form #newPassword").keyup(function () {
  let pass = $("#newPassword").val();
  let len = pass.length;
  if (len < 4) {
    $("#newPassword").css("border-bottom", "3px solid rgb(155, 106, 0)");
    $(".signup-form #error").html("Your password must contain 4 to 60 characters.");
  } else {
    $("#newPassword").css("border-bottom", "none");
    $(".signup-form #error").html("");
  }
});
$(".login #password").keyup(function () {
  let pass = $("#password").val();
  let len = pass.length;
  if (len < 4) {
    $("#password").css("border-bottom", "3px solid rgb(155, 106, 0)");
    $(".login #error").html("Your password must contain 4 to 60 characters.");
  } else {
    $("#password").css("border-bottom", "none");
    $(".login #error").html("");
  }
});
$(".login__sign-in").click(function (e) {
  let pass = $("#password").val();
  let len = pass.length;
  if (len < 4) {
    e.preventDefault();
  }
});
$(".login__sign-up").click(function (e) {
  let pass = $("#newPassword").val();
  let len = pass.length;
  if (len < 4) {
    e.preventDefault();
  }
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhone(number) {
  var regex = /^([+]|[0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
  return regex.test(number);
}

var pass = $(".log");
var email = $("#email");
var newPass = $(".sign");
var newEmail = $("#newEmail");
$("span#valid").hide();
$("#email").focusin(function () {
  let valid = $(".login span#valid");

  let cred = $(this).val();
  if (cred.length == 0 || isEmail(cred) || isPhone(cred)) {
    valid.show();
    email.css("margin-bottom", 0);
    pass.css("margin-top", "15px");
    email.css("border-bottom", "3px solid rgb(155, 106, 0)");
  }
});
$("#email").keyup(function () {
  let cred = $(this).val();
  if (isEmail(cred) || isPhone(cred)) {
    $("span#valid").hide();
    email.css({ "border-bottom": "none", "margin-bottom": "20px" });

    pass.css("margin-top", "5px");
  }
});

$("#newEmail").focusin(function () {
  let valid = $(".signup-form span#valid");
  let cred = $(this).val();
  if (cred.length == 0 || isEmail(cred) || isPhone(cred)) {
    valid.show();
    newEmail.css("margin-bottom", 0);
    newPass.css("margin-top", "15px");
    newEmail.css("border-bottom", "3px solid rgb(155, 106, 0)");
  }
});
$("#newEmail").keyup(function () {
  let cred = $(this).val();
  if (isEmail(cred) || isPhone(cred)) {
    $("span#valid").hide();
    newEmail.css({ "border-bottom": "none", "margin-bottom": "20px" });
    newPass.css("margin-top", "5px");
  }
});
let errorEmail = $(".errorEmail");
let errorPass = $(".errorPass");
let errEmail = $(".errEmail");
let signUpText = $("#signUpText");
let signUpSpinner = $("#signUpSpinner");
let signInText = $("#signInText");
let signInSpinner = $("#signInSpinner");
signInSpinner.hide();
signUpSpinner.hide();
// signInText.hide();
errEmail.hide();
errorEmail.hide();
errorPass.hide();
$(".loginForm").submit(async (e) => {
  signInText.hide();
  signInSpinner.show();

  e.preventDefault();
  let data = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  let config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let result = await fetch("/login", config);

  let final = await result.status; //result.json() for json code
  console.log(final);
  if (final === 200) {
    window.location.href = "/home";
  } else if (final === 400) {
    console.log("Invalid email");
    errorPass.hide();
    errorEmail.show();
  } else if (final === 401) {
    console.log("Wrong Password");
    errorEmail.hide();
    errorPass.show();
  }
});

$(".signupForm").submit(async (e) => {
  signUpText.hide();
  signUpSpinner.show();
  e.preventDefault();
  let data = {
    email: $("#newEmail").val(),
    password: $("#newPassword").val(),
    name: $("#name").val(),
  };

  let config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let result = await fetch("/signup", config);

  let final = await result.status; //result.json() for json code
  console.log(final);
  if (final === 200) {
    window.location.href = "/home";
  } else if (final === 400) {
    console.log("Invalid email");
    errEmail.show();
  }
});
