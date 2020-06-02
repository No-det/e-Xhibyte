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

// Calendar Stuff
const date_picker_element = document.querySelector(".date-picker");
const selected_date_element = document.querySelector(
  ".date-picker .selected-date"
);
const dates_element = document.querySelector(".date-picker .dates");
const mth_element = document.querySelector(".date-picker .dates .month .mth");
const prev_mth_element = document.querySelector(
  ".date-picker .dates .month .prev-mth"
);
const next_mth_element = document.querySelector(
  ".date-picker .dates .month .next-mth"
);
const days_element = document.querySelector(".date-picker .dates .days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + " " + year;
selected_date_element.textContent = formatDate(date);
calendarDate();

date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", gotToNextMonth);
prev_mth_element.addEventListener("click", gotToPrevMonth);

function toggleDatePicker(e) {
  if (!pathCheckerforClass(e.path, "dates")) {
    dates_element.classList.toggle("active");
  }
}
function gotToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mth_element.textContent = months[month] + " " + year;
  calendarDate();
}
function gotToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + " " + year;
  calendarDate();
}
function calendarDate(e) {
  days_element.innerHTML = "";
  let n = 31;
  if (month == 1) {
    n = 28;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    n = 30;
  }
  for (let i = 0; i < n; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected");
    }

    day_element.addEventListener("click", () => {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;

      calendarDate();
    });

    days_element.appendChild(day_element);
  }
}

function pathCheckerforClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}
function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = d.getFullYear();

  return day + " / " + month + " / " + year;
}
