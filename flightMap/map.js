
var mapModel = function () {
    console.log("hello");
    var gLatLng = function(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    };


    function placeMarker(position, name) {
        console.log(map);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: name
        });
        map.panTo(position);
    }

    var map;
    var pub = {};
    var priv = {};

    pub.init = (function() {

        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);


        var airports = priv.getAirports;

        airports.each(function() {
            placeMarker(this.LatLng, this.name);
        });

        //var marker = gLatLng(-34.397, 150.644);
        //placeMarker(marker);


    priv.getAirports = function() {

        var airportArray = new Array();

        var airport = {};
        airport.name = "Testflygplats";
        airport.LatLng = gLatLng(-38.800, 170.644);
        airport.destinations = new Array();


        airportArray.push(airport);

        return airportArray;
    };

    return pub;
    });
};


//function showMessage(element) {
//    var overlay = document.createElement('div');
//    overlay.appendChild(document.createTextNode('Vänligen vänta medan vi letar efter hotellet på kartan'));
//    overlay.style.padding = '5px';
//    overlay.style.backgroundColor = 'white';
//    overlay.style.zIndex = 1200;
//    overlay.style.cssFloat = 'left';
//    overlay.style.styleFloat = 'left';
//    overlay.className = 'ui-corner-all overDiv';


//    $(element).append(overlay);

//};

//ezy = {};
//ezy.maps = {};
//ezy.maps.google = (function (options) {
//    var priv = {}, pub = {};

//    var geocoder = {}, map = {};
//    pub.init = (function () {
//        priv.setupGeocoder();
//        priv.setupMap();

//        if (options.Adress != 0 || options.LatLng != 0)
//            priv.findAdress();
//    });

//    priv.findAdress = function () {
//        var marker;
//        if (options.Adress == 0) {
//            marker = new google.maps.Marker({ map: map, position: options.LatLng });
//            map.setZoom(14);
//            map.setCenter(options.LatLng);
//        } else {
//            geocoder.geocode({ 'address': options.Adress }, function (results, status) {
//                if (status == google.maps.GeocoderStatus.OK) {
//                    map.setCenter(results[0].geometry.location);
//                    marker = new google.maps.Marker({ map: map, position: results[0].geometry.location });
//                    map.setZoom(14);
//                } else {
//                    alert("Geocode was not successful for the following reason: " + status);
//                }
//            });
//        }
//    };

//    priv.setupMap = function () {

//        var mapOptions = {
//            center: new google.maps.LatLng(37.4419, -122.1419),
//            zoom: 2,
//            mapTypeId: google.maps.MapTypeId.ROADMAP,
//            overviewMapControl: true,
//            overviewMapControlOptions: {
//                opened: true
//            }
//        };
//        map = new google.maps.Map(options.mapElement.get("#map-canvas"), mapOptions);
//        map.overviewMapControl.opened = true;
//    };


//    priv.setupGeocoder = function () {
//        geocoder = new google.maps.Geocoder();
//    };

//    return pub;
//});
