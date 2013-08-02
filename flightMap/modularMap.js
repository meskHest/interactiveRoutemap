
var gLatLng = function (lat, lng) {
    return new google.maps.LatLng(lat, lng);
};

var map;
var lines = [];
var markers = [];
var infoWindows = [];

var ezyMap = (function() {
    var pub = {}, priv = {};
    pub.init = function() {
        map = priv.setupMap();

        priv.setupEventListeners();
        var airports = priv.getAirports();

        priv.setOriginMarkers(airports);
    };


    priv.setupMap = function() {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        return map;
    };


    priv.getAirports = function() {
        var airportArray = new Array();
        var airport = {};
        airport.name = "Testflygplats";
        airport.LatLng = gLatLng(-38.800, 170.644);

        var airport2 = {};
        airport2.name = "Testflygplats";
        airport2.LatLng = gLatLng(-18.800, 190.644);
        airport2.destinations = new Array();
        airport.destinations = new Array();


        var airport3 = {};
        airport3.name = "Testflygplats";
        airport3.LatLng = gLatLng(-68.800, 68.644);
        airport3.destinations = new Array();


        airport.destinations.push(airport2.LatLng, airport3.LatLng);
        airport2.destinations.push(airport.LatLng);
        airport3.destinations.push(airport2.LatLng);


        airportArray.push(airport, airport2, airport3);

        return airportArray;
    };

    priv.setOriginMarkers = function(airports) {
        $.each(airports, function() {
            priv.placeMarker(this);
        });
    };

    priv.placeMarker = function(airport) {
        var marker = new google.maps.Marker({
            position: airport.LatLng,
            map: map,
            title: airport.name,
            destinations: airport.destinations,
            infowindow: priv.getInfoWindow(airport)
    });
        marker.setIcon("airport.png");
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            priv.clearChoice();
            this.infowindow.open(map, marker);
            priv.drawRoutes(this.position, this.destinations);
            marker.setIcon("choosenAirport.png");
        });
    };


    priv.drawRoutes = function(airport, destinations) {
        $.each(destinations, function() {
            var dest = gLatLng(this.jb, this.kb);
            console.log("AIRPORT = " + airport + " ,  DESTINATION = " + dest);
            var line = new google.maps.Polyline({
                path: [airport, dest],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: map
            });
            lines.push(line);
        });
    };


    priv.setupEventListeners = function() {
        google.maps.event.addListener(map, 'click', function() {
            $.each(lines, function() {
                this.setMap(null);
            });
            $.each(markers, function() {
                this.setIcon("airport.png");
            });
            $.each(infoWindows, function () {
                this.setMap(null);
            });
        });
    };

    priv.clearChoice = function() {
        $.each(lines, function () {
            this.setMap(null);
        });
        $.each(markers, function () {
            this.setIcon("airport.png");
        });
        $.each(infoWindows, function () {
            this.setMap(null);
        });
    };

    priv.getInfoWindow = function(airport) {
        var contentString = '<div class="info-wrapper">' +
            '<div class="info-header">'+airport.name+'</div><div class="clear"></div>' +
            '<div style="margin-top:5px;border-bottom:1px dashed #eb8604;">Search flights</div>' +
            '<div class="left" style="margin-top:15px;">Destination: </div><div class="right" style="margin-top:10px;"><select style="width:120px;max-width:120px;"><option>Dublin, Ireland</option></select></div>' +
            '<div class="clear"></div>' +
            '<div style="padding:12px;padding-top:5;"><div class="left" style="margin-top:20px;border-right:1px solid #ddd;"><div>Departure date</div><div class="clear"></div><div style="margin-top:5px;padding-right:5px;"><select><option>Year</option></select></div><div style="margin-top:5px;padding-right:5px;"><select><option>Month</option></select></div><div style="margin-top:5px;padding-right:5px;"><select><option>Day</option></select></div></div>' +
            '<div class="left" style="margin-top:20px;padding-left:10px;"><div>Passengers</div><div class="clear"></div>' +
            '<div style="margin-top:5px;"><select><option>Adults</option></select></div><div style="margin-top:5px;"><select><option>Children</option></select></div><div style="margin-top:5px;"><select><option>Infants</option></select></div>' +
            '</div></div></div>' +
            '<div class="clear:both;"></div>' +
            '<div class="right" style="padding-top:25px;"><input type="submit" value="search"></div></div>';
        var infoWindow = new google.maps.InfoWindow({
            content: contentString,
        });
        infoWindows.push(infoWindow);
        return infoWindow;
    };


    return pub;
});


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