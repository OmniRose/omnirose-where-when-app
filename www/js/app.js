var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

$(document).on("deviceready", function() {
  deviceReadyDeferred.resolve();
});

$(document).on("mobileinit", function () {
  jqmReadyDeferred.resolve();
});

$.when(deviceReadyDeferred, jqmReadyDeferred).then(init);

console.log("starting");

function init() {

  StatusBar.hide();

  var $yyyymmdd_div = $("#yyyy-mm-dd");
  var $hhmmss_div = $("#hh-mm-ss");

  function update_date() {
    var now = new Date();
    var iso = now.toISOString();
    $yyyymmdd_div.text(iso.slice(0,10));
    $hhmmss_div.text(iso.slice(11,22));
  }

  setInterval(update_date, 10);


  var $latitude = $("#latitude");
  var $longitude = $("#longitude");
  var $accuracy = $("#accuracy");

  var $altitude = $("#altitude");
  var $altitudeAccuracy = $("#altitudeAccuracy");

  var $speed = $("#speed");
  var $heading = $("#heading");

  function update_location (position) {
    $latitude.text(position.coords.latitude);
    $longitude.text(position.coords.longitude);
    $accuracy.text(position.coords.accuracy);

    $altitude.text(position.coords.altitude);
    $altitudeAccuracy.text(position.coords.altitudeAccuracy);

    $speed.text(position.coords.speed);
    $heading.text(position.coords.heading);
  }

  navigator.geolocation.watchPosition(
    update_location,
    function (err) {console.log(err);},
    {
      maximumAge: 1000,
      enableHighAccuracy: true
    }
  );


}
