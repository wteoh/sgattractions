//Load store category into localstorage based on the link that was clicked.
//redirect to attractions page
$(document).on('click', '#category-cards a', function(event, ui) {
    var data_id = $(this).attr('id');
    // store some data
    if (typeof(Storage) !== "undefined") {
        //localStorage.category = data_id;
        localStorage.category = data_id;
    }
    // Change page
    $.mobile.changePage("#attractions");
    //window.location.href = "#attractions";

});

$(document).on('click', 'li', function() {
    if (typeof(Storage) !== "undefined") {
        //localStorage.attraction_id = $(this).attr("id");
        localStorage.attraction_id = $(this).attr("id");
    }
    $.mobile.changePage("#attraction-details");
    //window.location.href = "#attraction-details";
});

$(document).on('click', '#mapBtn', function(event, ui) {
  $.mobile.changePage("#map");
});

//load category data from category JSON and display
$(document).on('pagecreate', '#main', function() {
    $.getJSON("./json/category.json", function(data) {
        $.each(data, function(key, val) {
            $('#category-cards').append("<div><a href='#' id='" + val.id + "'><div class='card'><div class='card-image'><img src='" + val.image + "' width='100%' height='100%'/><h2>" + val.name +
                "</h2></div></div></a>");
        });
    });
});

$(document).on('pagebeforeshow', '#attractions', function() {
    //var category = localStorage.category;
    //empty list to prevent duplicates
    if (localStorage.category != "undefined") {
        $('#attraction-list').empty();
    }
    //get attractions JSON and populate list based on category
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            if (val.category == localStorage.category) {
                $('#attraction-list').append("<li id='" + val.id + "' class='ui-li-has-thumb ui-first-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + val.image +
                    "' class='thumbnail'/><h2>" +
                    val.name + "</h2></a></li>");
            }
        });
    });

});

$(document).on('pagebeforeshow', '#attraction-details', function() {

    //get attractions JSON and populate list based on category
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            if (val.id == localStorage.attraction_id) {
                $('#attraction-image').html("<div class='card'><div class='card-image'><img src='" + val.image + "' width='100%' height='100%'/><h4>" + val.name + "</h4></div></div>");
                $('#ophours').html("<b>Opening Hours: </b>" + val.operatinghours);
                $('#address').html("<b>Address: </b>" + val.address);
                $('#description').html("<b>Description: </b><p style='white-space:normal;'>" + val.desc + "</p>");
                $('#call').html("<a href=tel:'" + val.phone + "' class='ui-btn ui-shadow ui-shadow ui-btn-icon-left ui-icon-phone' data-role='button' rel='external'>Call</a>");
                localStorage.lattitude = val.lattitude;
                localStorage.longtitude = val.longtitude;
                return false;
            }
        });
    });
});

$("#map_canvas").on('pageshow', function() {
    var myLatlng = new google.maps.LatLng(51.520838, -0.140261);
    var myOptions = {
        zoom: 15,
        center: myLatlng,

        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
});
