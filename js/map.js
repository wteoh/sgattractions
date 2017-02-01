$(document).on('pageinit', function() {
    var myLatlng = new google.maps.LatLng(51.520838, -0.140261);
    var myOptions = {
        zoom: 15,
        center: myLatlng,

        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
});
