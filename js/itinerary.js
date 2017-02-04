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



//retrieve all itinerary
$(document).on('pagebeforeshow', '#main', function() {
    //check if itineray localstorage is undefined

    //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
    var itinerary;
    try {
        itinerary = JSON.parse(localStorage.itinerary);
    } catch (e) {
        itinerary = {};
    }

    //if the itineray object is empty, display empty result
    if (jQuery.isEmptyObject(itinerary)) {
        $('#itinerary-ul').append("<li class='ui-li-static ui-body-a'>No Favorite List Created</li>");
    } else {
        //otherwise, print all itinerary created
        $.each(itinerary, function(key, val) {
            $('#itinerary-ul').append("<li ><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + val.name + "</a></li>");
        });
    }

});

//retrieve all trip detai
$(document).on('pagebeforeshow', '#tripdetails', function() {
  //retrieve number of days


  //retrieve attractions saved for the days
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



//view itinerary details

//remove activity from itinerary

//add activity to itinerary
