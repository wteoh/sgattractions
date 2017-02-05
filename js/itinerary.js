//create new favlist
$(document).on('click', '#btnCreate', function() {

    var name = $("#name-c").val();
    var desc = $("#description").val();

    //validate that name is not empty
    if (name == "") {
        $("#name-c").parent().css("background-color", "#ec6565");
        return false;
    }

    if (desc == "") {
        $("#description").parent().css("background-color", "#ec6565");
        return false;
    }

    if (localStorage.favlist == undefined) {
        //store JSON object into localStorage
        localStorage.favlist = JSON.stringify([{
            "name": name,
            "desc": desc
        }]);

        //location.reload(true);
    } else {
        //check if fav list exists
        if (Boolean(checkName(name))) {
            $("#err_name").html("There is an exisiting list with a similar name");
            return false;
        } else {
            var trip = JSON.parse(localStorage.favlist);
            trip.push({
                "name": name,
                "desc": desc
            });
            localStorage.favlist = JSON.stringify(trip);
            //location.reload(true);
        }
    }

    location.reload(true);
    var toast = function(msg) {
        $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
            .css({
                display: "block",
                opacity: 0.90,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2
            })
            .appendTo($.mobile.pageContainer).delay(1500)
            .fadeOut(400, function() {
                $(this).remove();
            });
    }
});

//click handler for li
$(document).on('pagebeforeshow', '#attractions', function() {

    $('#attraction-list').empty();

    //get all attractions from favlist localstorage
    //try to retrieve favlist JSON, if JSON is null, display No favlist created
    var favorites;
    try {
        favorites = JSON.parse(localStorage.favorites);
    } catch (e) {
        favorites = {};
    }


    var fav_name = localStorage.fav_name;
    var count = 0;
    //get all attractions added to favlist
    $.each(favorites, function(key, val) {
        if (val.fav_name == fav_name) {
            count++;
            var attr = null;
            $.getJSON("./json/attractions.json", function(data) {
                $.each(data, function(key, val2) {
                    if (val2.id == val.attr_id) {
                        attr = JSON.stringify(val2);
                        displayAttractions(attr);
                        count++;
                        return false;
                    }
                });

            });
        }
    });

    if (count == 0) {
        $('#attraction-list').append("<li class='ui-li-static ui-body-a'>No Favorites Added</li>");
    }

});

function displayAttractions(attr) {
    var attraction = JSON.parse(attr);
    $('#attraction-list').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + attraction.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + attraction.image +
        "' class='thumbnail'/><h2>" +
        attraction.name + "</h2></a></li>");

}

$(document).on('click', '#attraction-list a', function() {
    localStorage.attraction_id = $(this).attr("id");
    //$.mobile.changePage("index.html#attraction-details");
    window.location.href = "index.html#attraction-details";

});


$(document).on('click', '#itinerary-ul a', function() {
    localStorage.fav_name = $(this).attr('id');
    $.mobile.changePage("#attractions");
});

//retrieve all fav list
$(document).on('pagebeforeshow', '#main', function() {
    $('#itinerary-ul').empty();
    $('#itinerary-ul').append("<li role='heading' data-role='list-divider' class='ui-li-divider ui-bar-inherit ui-first-child ui-last-child'>My Favorite List</li>");
    //try to retrieve favlist JSON, if JSON is null, display No favlist created
    var favlist;
    try {
        favlist = JSON.parse(localStorage.favlist);
    } catch (e) {
        favlist = {};
    }

    //if the itineray object is empty, display empty result
    if (jQuery.isEmptyObject(favlist)) {
        $('#itinerary-ul').append("<li class='ui-li-static ui-body-a'>No Favorite List Created</li>");
    } else {
        //otherwise, print all favlist created
        $.each(favlist, function(key, val) {
            $('#itinerary-ul').append("<li ><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r' id='" + val.name + "'><h2>" + val.name + "</h2><p>" + val.desc + "</p></a></li>");
        });
    }

});
//check if name exists in favlist JSON
function checkName(name) {
    var exist = false;
    //check if localStorage.favlist is undefined
    if (localStorage.favlist === undefined) {
        exist = false;
    }

    var data = JSON.parse(localStorage.favlist);

    //loop JSON check for favlist with similar names
    $.each(data, function(key, val) {
        if (val.name == name) {
            exist = true;
            return false;
        }
    });

    return exist;
}

function getAttraction(id) {
    //get attractions JSON and populate list based on category
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            if (val.id == id) {
                localStorage.attraction = JSON.stringify(val);
                return false;
            }
        });
    });
}
