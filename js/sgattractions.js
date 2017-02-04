//Load store category into localstorage based on the link that was clicked.
//redirect to attractions page
$(document).on('click', '#category-cards a', function(event, ui) {
    var data_id = $(this).attr('id');
    // store some data
    if (typeof(Storage) !== "undefined") {
        //localStorage.category = data_id;
        localStorage.category = data_id;
    }
    $.mobile.changePage("#attractions");
});

//get all attractions based on category selected
$(document).on('pagebeforeshow', '#attractions', function() {
    //empty list to prevent duplicates
    if (localStorage.category != "undefined") {
        $('#attraction-list').empty();
    }
    //get attractions JSON and populate list based on category
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            if (val.category == localStorage.category) {
                $('#attraction-list').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + val.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + val.image +
                    "' class='thumbnail'/><h2>" +
                    val.name + "</h2></a></li>");
            }
        });
    });

});

//get all attractions
$(document).on('pagebeforeshow', '#all_attractions_page', function() {
    if (localStorage.category != "undefined") {
        $('#all_attractions_lv').empty();
    }

    //get all attractions JSON and populate list
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            $('#all_attractions_lv').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + val.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + val.image +
                "' class='thumbnail'/><h2>" +
                val.name + "</h2></a></li>");
        });
    });


});


//get attraction details based on attraction selected
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
                localStorage.attraction = JSON.stringify(val);
                return true;
            }
        });
    });
});

//listener for attraction listview
$(document).on('click', '#attraction-list a', function() {
    if (typeof(Storage) !== "undefined") {
        localStorage.attraction_id = $(this).attr("id");
    }
    $.mobile.changePage("#attraction-details");
});

//listener for all_attraction listview
$(document).on('click', '#all_attractions_page a', function() {
    if (typeof(Storage) !== "undefined") {
        localStorage.attraction_id = $(this).attr("id");
    }
    $.mobile.changePage("#attraction-details");
});

//listener for map button
$(document).on('click', '#mapBtn', function(event, ui) {
    $.mobile.changePage("#map");
});

//load category data from category JSON and display
$(document).on('pagecreate', '#main', function() {
    $.getJSON("./json/category.json", function(data) {
        $.each(data, function(key, val) {
            $('#category-cards').append("<div><a href='#' id='" + val.id + "' data-transition='slidedown'><div class='card'><div class='card-image'><img src='" + val.image + "' width='100%' height='100%'/><h2>" + val.name +
                "</h2></div></div></a>");
        });
    });
});

//render map on pageshow
$(document).on('pageshow', '#map', function() {
    //get selected attraction json
    var attraction = JSON.parse(localStorage.attraction);

    //create new GMAPs
    var map = new GMaps({
        div: '#map_canvas',
        lat: parseFloat(attraction.lattitude),
        lng: parseFloat(attraction.longtitute),
        zoom: 15
    });

    //adding marker on map
    map.addMarker({
        lat: parseFloat(attraction.lattitude),
        lng: parseFloat(attraction.longtitute),
        infoWindow: {
            content: "<h3>" + attraction.name + "</h3><p class='address'>Address: " + attraction.address + ", Tel: " + attraction.phone + "</p>"
        },
    });
    //trigger click to show infoWindow
    google.maps.event.trigger(map.markers[0], 'click');
});

//load all favorite list created
$(document).on("popupbeforeposition", "#favpopup", function() {

    $('#favddl').empty();
    //get attraction_id
    var attraction_id = localStorage.attraction_id;

    //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
    var itinerary;
    try {
        itinerary = JSON.parse(localStorage.itinerary);
    } catch (e) {
        itinerary = {};
    }
    //otherwise, print all itinerary created
    $.each(itinerary, function(key, val) {
        $('#favddl').append("<option value='" + attraction_id + "'>" + val.name + "</option>");
    });

    $("#favddl").trigger("change");
});

//listener for add to fav btnCreate
$(document).on('click', '#addfav', function() {
    //get selected value
    var attr_id = $("#favdll").val();
    console.log(attr_id);
});
