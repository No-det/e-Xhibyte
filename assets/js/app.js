function pass() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic1").classList.remove("fa-eye-slash");
    document.querySelector("#ic1").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic1").classList.remove("fa-eye");
    document.querySelector("#ic1").classList.add("fa-eye-slash");
  }
}

function cpass() {
  var x = document.getElementById("cpass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic2").classList.remove("fa-eye-slash");
    document.querySelector("#ic2").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic2").classList.remove("fa-eye");
    document.querySelector("#ic2").classList.add("fa-eye-slash");
  }
}

function spass() {
  var x = document.getElementById("spass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic3").classList.remove("fa-eye-slash");
    document.querySelector("#ic3").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic3").classList.remove("fa-eye");
    document.querySelector("#ic3").classList.add("fa-eye-slash");
  }
}

function changePass() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic4").classList.remove("fa-eye-slash");
    document.querySelector("#ic4").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic4").classList.remove("fa-eye");
    document.querySelector("#ic4").classList.add("fa-eye-slash");
  }
}

function confirmChangePass() {
  var x = document.getElementById("cpass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic5").classList.remove("fa-eye-slash");
    document.querySelector("#ic5").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic5").classList.remove("fa-eye");
    document.querySelector("#ic5").classList.add("fa-eye-slash");
  }
}
function currentPass() {
  var x = document.getElementById("opass");
  if (x.type === "password") {
    x.type = "text";
    document.querySelector("#ic6").classList.remove("fa-eye-slash");
    document.querySelector("#ic6").classList.add("fa-eye");
  } else {
    x.type = "password";
    document.querySelector("#ic6").classList.remove("fa-eye");
    document.querySelector("#ic6").classList.add("fa-eye-slash");
  }
}
