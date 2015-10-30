var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

$(document).on("deviceready", function() {
  deviceReadyDeferred.resolve();
});

$.when(deviceReadyDeferred).then(init);

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

  var $geolocation_updated = $("#geolocation_updated");
  $geolocation_updated.hide();

  function update_location (position) {
    $latitude.text( magellan(position.coords.latitude).latitude().toDM(' ') );
    $longitude.text( magellan(position.coords.longitude).longitude().toDM(' ') );
    $accuracy.text(position.coords.accuracy);

    $altitude.text(position.coords.altitude);
    $altitudeAccuracy.text(position.coords.altitudeAccuracy);

    $speed.text(position.coords.speed);
    $heading.text(position.coords.heading);

    $geolocation_updated.show();
    $geolocation_updated.fadeOut();
  }

  function update_location_error (err) {
    console.log(err);
  }

  var update_location_options = {
    maximumAge: 1000,
    enableHighAccuracy: true
  };

  navigator.geolocation.watchPosition(
    update_location,
    update_location_error,
    update_location_options
  );

}
