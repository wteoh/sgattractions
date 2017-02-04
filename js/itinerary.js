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
});

//click handler for li
$(document).on('pagebeforeshow', '#attractions', function() {
    //get all attractions from favlist localstorage
    //try to retrieve favlist JSON, if JSON is null, display No favlist created
    var favorites;
    try {
        favorites = JSON.parse(localStorage.favorites);
    } catch (e) {
        favorites = {};
    }

    //if the itineray object is empty, display empty result
    if (jQuery.isEmptyObject(favorites)) {
        $('#attraction-list').append("<li class='ui-li-static ui-body-a'>No favlist Added</li>");
    } else {

        var fav_name = localStorage.fav_name;

        //get all attractions added to favlist
        $.each(favorites, function(key, val) {
            if (val.fav_name == fav_name) {
                var attraction = localStorage.attraction;
                $('#attraction-list').append("<li class='ui-li-has-thumb ui-first-child'><a id='" + attraction.id + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src='" + attraction.image +
                    "' class='thumbnail'/><h2>" +
                    attraction.name + "</h2></a></li>");
            }
        });
    }

});

$(document).on('click', '#itinerary-ul a', function() {
  localStorage.fav_name = $(this).attr('id');
  $.mobile.changePage("#attractions");
});

//retrieve all fav list
$(document).on('pagebeforeshow', '#main', function() {
    //check if itineray localstorage is undefined

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
