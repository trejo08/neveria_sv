// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){
	if ($('#map-canvas').length) {		
		google.maps.event.addDomListener(window, 'load', initialize);
	} else{
		alert('no esta el div');
	};
});

var sucursales = [
  ['San Salvador', 13.713371, -89.200112, 1],
  ['Santa Ana', 13.999536,-89.551991, 2],
  ['San Miguel', 13.480782,-88.176323, 3]
];

function setMarkers(map, locations) {
  for (var i = 0; i < locations.length; i++) {
    var sucursal = locations[i];
    var myLatLng = new google.maps.LatLng(sucursal[1], sucursal[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        draggable:false,
        map: map,
        title: sucursal[0],
        zIndex: sucursal[3]
    });

    //agregando efecto center a cada marker
    google.maps.event.addListener(marker, 'click', function() {
		map.setZoom(9);
		// map.setCenter(e.getPosition());
		map.panTo(this.getPosition());
		// alert(this.getTitle());
	});
  }
}


function initialize() {
	var san_salvador = new google.maps.LatLng(13.713371, -89.200112);
	var mapOptions = {
		center: san_salvador,
        draggable:false,
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

	// var markers = new google.maps.Marker(
	// 	{
	// 	    position: san_salvador,
	// 	    title:"Sucursal San Salvador!"
	// 	});
	// markers.setMap(map);

	//seteando las sucursales
	setMarkers(map, sucursales);
}