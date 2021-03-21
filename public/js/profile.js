$(document).ready(function () {
  let deleteAcc = $(".delete_account");
  let updateProfile = $(".update_profile");
  let eye2 = $(".field-icon-2");
  let eye1 = $(".field-icon-1");
  let eye = $(".field-icon");
  let showUpdate = $("#showUpdate");
  let showDelete = $("#showDelete");

  eye.hide();
  eye1.hide();
  eye2.hide();
  deleteAcc.hide();
  // updateProfile.hide();

  showUpdate.click(function () {
    deleteAcc.hide();
    updateProfile.show();
    $(".deleteForm")[0].reset();
  });
  showDelete.click(function () {
    updateProfile.hide();
    deleteAcc.show();
    $(".updateForm")[0].reset();
  });

  $("#newPassword").keydown(function () {
    $(".sign").find(eye1).show();
  });
  $("#newPassword1").keydown(function () {
    $(".sign").find(eye).show();
  });
  $("#password").keydown(function () {
    $(".log").find(eye2).show();
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
      var input = $("#newPassword1");
      showPassword(input);
    } else if ($(this).parent([2]).hasClass("log")) {
      var input = $("#password");
      showPassword(input);
    }
  });
  eye1.click(function () {
    var input = $("#newPassword");
    showPassword(input);
  });
  eye2.click(function () {
    var input = $("#password");
    showPassword(input);
  });
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhone(number) {
  var regex = /^([+]|[0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
  return regex.test(number);
}

let err = $(".delete_account .errorEmail");
let errPass = $(".delete_account .errorPass");
err.hide();
errPass.hide();
$(".deleteForm").submit(async (e) => {
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

  let result = await fetch("/delete", config);

  let final = await result.status; //result.json() for json code
  console.log(final);
  if (final === 200) {
    window.location.href = "/";
  } else if (final === 400) {
    console.log("Invalid credentials");
    err.show();
    errPass.hide();
  } else {
    errPass.show();
    err.hide();
  }
});

let errE = $(".update_profile .errorEmail");
let errP = $(".update_profile .errorPass");
let success = $(".update_profile .success");
let errAcc = $(".update_profile .errorAcc");
let errCred = $(".update_profile .errorCred");
errCred.hide();
success.hide();
errE.hide();
errP.hide();
errAcc.hide();
$(".updateForm").submit(async (e) => {
  e.preventDefault();
  let data = {
    name: $("#name").val(),
    newName: $("#newName").val(),
    email: $("#newEmail").val(),
    newEmail: $("#newEmail1").val(),
    password: $("#newPassword").val(),
    newPassword: $("#newPassword1").val(),
  };

  let config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  // console.log(data);
  let result = await fetch("/update", config);

  let final = await result.status; //result.json() for json code
  console.log(final);
  if (final === 200) {
    success.show();
    $(".updateForm")[0].reset();
    errCred.hide();
    errE.hide();
    errP.hide();
    errAcc.hide();
  } else if (final === 400) {
    console.log("already exists");
    success.hide();
    errE.hide();
    errP.hide();
    errAcc.show();
    $("#newEmail1").val("");
    // $("#newEmail1").css("border-bottom", "4px solid rgb(155, 106, 0)");
  } else if (final === 401) {
    console.log("wrong pass");
    errP.show();
    success.hide();
    errE.hide();
    errAcc.hide();
    $("#newPassword").val("");
  } else if (final === 402) {
    success.hide();
    errE.hide();
    errP.hide();
    errAcc.hide();
    errCred.show();
    console.log("Wrong creds");
  } else if (final === 403) {
    errE.show();
    success.hide();
    errP.hide();
    errAcc.hide();
    console.log("No user found");
    $("#newEmail").val("");
  }
});
