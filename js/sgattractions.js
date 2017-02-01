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


// popup examples
$( document ).on( "pagecreate", function() {
    // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
    function scale( width, height, padding, border ) {
        var scrWidth = $( window ).width() - 30,
            scrHeight = $( window ).height() - 30,
            ifrPadding = 2 * padding,
            ifrBorder = 2 * border,
            ifrWidth = width + ifrPadding + ifrBorder,
            ifrHeight = height + ifrPadding + ifrBorder,
            h, w;
        if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
            w = ifrWidth;
            h = ifrHeight;
        } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
            w = scrWidth;
            h = ( scrWidth / ifrWidth ) * ifrHeight;
        } else {
            h = scrHeight;
            w = ( scrHeight / ifrHeight ) * ifrWidth;
        }
        return {
            'width': w - ( ifrPadding + ifrBorder ),
            'height': h - ( ifrPadding + ifrBorder )
        };
    };
    $( ".ui-popup iframe" )
        .attr( "width", 0 )
        .attr( "height", "auto" );
    $( "#popupMap iframe" ).contents().find( "#map_canvas" )
        .css( { "width" : 0, "height" : 0 } );
    $( "#popupMap" ).on({
        popupbeforeposition: function() {
            var size = scale( 480, 320, 0, 1 ),
                w = size.width,
                h = size.height;
            $( "#popupMap iframe" )
                .attr( "width", w )
                .attr( "height", h );
            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": w, "height" : h } );
        },
        popupafterclose: function() {
            $( "#popupMap iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );
            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
                .css( { "width": 0, "height" : 0 } );
        }
    });
});
