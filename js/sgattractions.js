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
                return false;
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
    $("err_name").text = "";
    $('#favddl').empty();
    //get attraction_id
    var attraction_id = localStorage.attraction_id;

    //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
    var favorites;
    try {
        favorites = JSON.parse(localStorage.favlist);
    } catch (e) {
        favorites = {};
    }
    //otherwise, print all itinerary created
    $.each(favorites, function(key, val) {
        $('#favddl').append("<option value='" + attraction_id + "'>" + val.name + "</option>");
    });

    $("#favddl").trigger("change");
});

//listener for add to fav btnCreate
$(document).on('click', '#btnAdd', function() {
    //get selected value
    var fav_name = $( "#favddl option:selected" ).text();

    //get current attraction id
    var attr_id = localStorage.attraction_id;

    if (localStorage.favorites == undefined) {
        //store JSON object into localStorage
        localStorage.favorites = JSON.stringify([{
            "fav_name": fav_name,
            "attr_id": attr_id
        }]);

        location.reload(true);
    } else {
        //check if fav list exists
        if (Boolean(checkName(fav_name, attr_id))) {
            $("#err_name").html("Attraction already exist in the list");
            return false;
        } else {
            var fav = JSON.parse(localStorage.favorites);
            fav.push({
                "fav_name": fav_name,
                "attr_id": attr_id
            });
            localStorage.favorites = JSON.stringify(fav);
            location.reload(true);
        }
    }


    console.log(attr_id);
});

//check if name exists in itinerary JSON
function checkName(fav_name, attr_id) {
    var exist = false;
    //check if localStorage.itinerary is undefined
    if (localStorage.favorites === undefined) {
        exist = false;
    }

    var data = JSON.parse(localStorage.favorites);

    //loop JSON check for itinerary with similar names
    $.each(data, function(key, val) {
        if (val.fav_name == fav_name && val.attr_id == attr_id) {
            exist = true;
            return false;
        }
    });

    return exist;
}
