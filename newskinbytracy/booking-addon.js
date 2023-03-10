function getBookingData() {
  return localStorage.getItem("clickedBooking");
}

function setBookingData(cat, serv) {
  var data = { category: cat, service: serv };
  var str = JSON.stringify(data);
  localStorage.setItem("clickedBooking", str);
}

function autofillAppointmentForm() {
  var $ = jQuery;
  console.log("[INFO] autofillAppointmentForm");
  var str = localStorage.getItem("clickedBooking");
  localStorage.removeItem("clickedBooking");
  var data = JSON.parse(str) || {};
  if (data.category) {
    var $el1 = $(".bookly-table .bookly-form-group:nth-child(1) select")
    $el1.prop("value", data.category)
    $el1.change()
  }
  if (data.service) {
    var $el2 = $(".bookly-table .bookly-form-group:nth-child(2) select")
    $el2.prop("value", data.service)
    $el2.change()
  }
}

function pollBookingForm() {
  var $ = jQuery;
  var timer = setInterval(function () {
    console.log("[INFO] Polling...");
    var $el = $(".bookly-form .bookly-table select");
    if ($el.length > 0) {
      clearInterval(timer);
      autofillAppointmentForm();
      console.log("[INFO] done");
    }
  }, 500);
}

function initBookingAddon() {
  if (window.location.pathname.includes("/appointment")) {
    pollBookingForm();
  }
  jQuery("body").on("click", "#wpba-book-now-facials-01 a", function (e) {
    e.preventDefault();
    setBookingData(1, 1);
    window.location = "/appointment/";
  });
  jQuery("body").on("click", "#wpba-book-now-facials-02 a", function (e) {
    e.preventDefault();
    setBookingData(1, 2);
    window.location = "/appointment/";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initBookingAddon();
});
