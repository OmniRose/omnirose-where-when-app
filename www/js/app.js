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

  var $yyyymmdd_div = $("#yyyy-mm-dd");
  var $hhmmss_div = $("#hh-mm-ss");

  function update_date() {
    var now = new Date();
    var iso = now.toISOString();
    $yyyymmdd_div.text(iso.slice(0,10));
    $hhmmss_div.text(iso.slice(11,22));
  }

  setInterval(update_date, 10);
}
