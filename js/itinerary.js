//create new itinerary

//retrieve all itinerary
$(document).on('pagebeforeshow', '#main', function() {
  //try to retrieve itinerary JSON, if JSON is null, display No itinerary created
  var itinerary = JSON.parse(localStorage.itinerary);
  if(itinerary === null)
  {
    $('#itinerary-ul').append("<li>No Trip Created</li>");
  }

});


//view itinerary details

//remove activity from itinerary

//add activity to itinerary
