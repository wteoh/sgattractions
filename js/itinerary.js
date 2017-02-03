


//create new itinerary

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
function checkName()
{
  //get the itinerary JSON

}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


//view itinerary details

//remove activity from itinerary

//add activity to itinerary
