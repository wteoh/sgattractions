//create new itinerary
$(document).on('click', '#btnCreate', function() {

    var name = $("#name-c").val();
    var days = $("#days").val();

    //validate that name is not empty
    console.log($("#name-c").val());
    if (name == "") {
        $("#name-c").parent().css("background-color", "#ec6565");
        return false;
    }

    if (days == "") {
        $("#days").parent().css("background-color", "#ec6565");
        return false;
    }

    if (localStorage.itinerary == undefined) {
        //store JSON object into localStorage
        localStorage.itinerary = JSON.stringify([{
            "name": name,
            "days": days
        }]);
    } else {
        //check if tripname exists
        if (Boolean(checkName(name))) {
            $("#err_name").html("There is an exisiting trip with a similar name");
            return false;
        } else {
            var trip = JSON.parse(localStorage.itinerary);
            trip.push({
                "name": name,
                "days": days
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
        $('#itinerary-ul').append("<li class='ui-li-static ui-body-a'>No Trip Created</li>");
    } else {
        //otherwise, print all itinerary created
        $.each(itinerary, function(key, val) {
            $('#itinerary-ul').append("<li class='ui-li-static ui-body-a'>" + val.name + "</li>");
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
    $.each(data, function() {
        if (data.name == name) {
            exist = true;
            return false;
        }
    });

    return exist;
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}


//view itinerary details

//remove activity from itinerary

//add activity to itinerary
