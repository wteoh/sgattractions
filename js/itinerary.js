//create new itinerary
$(document).on('click', '#btnCreate', function() {

    var name = $("#name-c").val();
    var desc = $("#description").val();

    //validate that name is not empty
    console.log($("#name-c").val());
    if (name == "") {
        $("#name-c").parent().css("background-color", "#ec6565");
        return false;
    }

    if (desc == "") {
        $("#description").parent().css("background-color", "#ec6565");
        return false;
    }

    if (localStorage.itinerary == undefined) {
        //store JSON object into localStorage
        localStorage.itinerary = JSON.stringify([{
            "name": name,
            "desc": desc
        }]);

        location.reload(true);
    } else {
        //check if fav list exists
        if (Boolean(checkName(name))) {
            $("#err_name").html("There is an exisiting list with a similar name");
            return false;
        } else {
            var trip = JSON.parse(localStorage.itinerary);
            trip.push({
                "name": name,
                "desc": desc
            });
            localStorage.itinerary = JSON.stringify(trip);
            location.reload(true);
        }
    }
});

//click handler for li
$(document).on('click', '#itinerary-ul a', function() {
    //get all attractions from favorites localstorage
    //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
    var favorites;
    try {
        favorites = JSON.parse(localStorage.favorites);
    } catch (e) {
        favorites = {};
    }

    //if the itineray object is empty, display empty result
    if (jQuery.isEmptyObject(favorites)) {
        $('#attraction-list').append("<li class='ui-li-static ui-body-a'>No Favorites Added</li>");
    } else {
        //otherwise, print all itinerary created
        // $.each(favorites, function(key, val) {
        //   $('#attraction-list').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + val.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + val.image +
        //       "' class='thumbnail'/><h2>" +
        //       val.name + "</h2></a></li>");
        // });

        //get selected fav list name
        var favlist = $(this).attr('id');

        //get all attractions added to favlist
        $.each(favlist, function(key, val) {
          if(val.name == favlist) {
              var attraction = getAttraction(val.attr_id);
              $('#attraction-list').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + attraction.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + attraction.image +
                  "' class='thumbnail'/><h2>" +
                  attraction.name + "</h2></a></li>");
          }
        });
    }

});

//retrieve all fav list
$(document).on('pagebeforeshow', '#main', function() {
    //check if itineray localstorage is undefined

    //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
    var favlist;
    try {
        favlist = JSON.parse(localStorage.itinerary);
    } catch (e) {
        favlist = {};
    }

    //if the itineray object is empty, display empty result
    if (jQuery.isEmptyObject(favlist)) {
        $('#itinerary-ul').append("<li class='ui-li-static ui-body-a'>No Favorite List Created</li>");
    } else {
        //otherwise, print all itinerary created
        $.each(favlist, function(key, val) {
            $('#itinerary-ul').append("<li ><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r' id='" + val.name + "'><h2>" + val.name + "</h2><p>" + val.desc + "</p></a></li>");
        });
    }

});


$(document).on('pageinit', '#form', function() {
    $(document).on('click', '#submit', function() {
        //check if itinerary json file exist
        try {
            itinerary = JSON.parse(localStorage.itinerary);
        } catch (e) {
            itinerary = {};
        }

    });
});

//check if name exists in itinerary JSON
function checkName(name) {
    var exist = false;
    //check if localStorage.itinerary is undefined
    if (localStorage.itinerary === undefined) {
        exist = false;
    }

    var data = JSON.parse(localStorage.itinerary);

    //loop JSON check for itinerary with similar names
    $.each(data, function(key, val) {
        if (val.name == name) {
            exist = true;
            return false;
        }
    });

    return exist;
}

function getAttraction(id) {
    var attr;
    //get attractions JSON and populate list based on category
    $.getJSON("./json/attractions.json", function(data) {
        $.each(data, function(key, val) {
            if (val.id == id) {
                attr = val;
                return false;
            }
        });
    });

    return attr;
}

//view itinerary details

//remove activity from itinerary

//add activity to itinerary
