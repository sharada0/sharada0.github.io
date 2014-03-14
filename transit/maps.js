var myLat = 42.40;
var myLng = -71.12;
var request = new XMLHttpRequest();

var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 13, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var xhr;
var line;

var stations = [
  {
    "Line":"Blue",
    "station":"Airport",
    "lat":42.374262,
    "Long":-71.030395
  },
  {
    "Line":"Blue",
    "station":"Aquarium",
    "lat":42.359784,
    "Long":-71.051652
  },
  {
    "Line":"Blue",
    "station":"Beachmont",
    "lat":42.39754234,
    "Long":-70.99231944
  },
  {
    "Line":"Blue",
    "station":"Bowdoin",
    "lat":42.361365,
    "Long":-71.062037
  },
  {
    "Line":"Blue",
    "station":"Government Center",
    "lat":42.359705,
    "Long":-71.059215
  },
  {
    "Line":"Blue",
    "station":"Maverick",
    "lat":42.36911856,
    "Long":-71.03952958
  },
  {
    "Line":"Blue",
    "station":"Orient Heights",
    "lat":42.386867,
    "Long":-71.004736
  },
  {
    "Line":"Blue",
    "station":"Revere Beach",
    "lat":42.40784254,
    "Long":-70.99253321
  },
  {
    "Line":"Blue",
    "station":"State Street",
    "lat":42.358978,
    "Long":-71.057598
  },
  {
    "Line":"Blue",
    "station":"Suffolk Downs",
    "lat":42.39050067,
    "Long":-70.99712259
  },
  {
    "Line":"Blue",
    "station":"Wonderland",
    "lat":42.41342,
    "Long":-70.991648
  },
  {
    "Line":"Blue",
    "station":"Wood Island",
    "lat":42.3796403,
    "Long":-71.02286539
  },
  {
    "Line":"Orange",
    "station":"Back Bay",
    "lat":42.34735,
    "Long":-71.075727
  },
  {
    "Line":"Orange",
    "station":"Chinatown",
    "lat":42.352547,
    "Long":-71.062752
  },
  {
    "Line":"Orange",
    "station":"Community College",
    "lat":42.373622,
    "Long":-71.069533
  },
  {
    "Line":"Orange",
    "station":"Downtown Crossing",
    "lat":42.355518,
    "Long":-71.060225
  },
  {
    "Line":"Orange",
    "station":"Forest Hills",
    "lat":42.300523,
    "Long":-71.113686
  },
  {
    "Line":"Orange",
    "station":"Green Street",
    "lat":42.310525,
    "Long":-71.107414
  },
  {
    "Line":"Orange",
    "station":"Haymarket",
    "lat":42.363021,
    "Long":-71.05829
  },
  {
    "Line":"Orange",
    "station":"Jackson Square",
    "lat":42.323132,
    "Long":-71.099592
  },
  {
    "Line":"Orange",
    "station":"Malden Center",
    "lat":42.426632,
    "Long":-71.07411
  },
  {
    "Line":"Orange",
    "station":"Mass Ave",
    "lat":42.341512,
    "Long":-71.083423
  },
  {
    "Line":"Orange",
    "station":"North Station",
    "lat":42.365577,
    "Long":-71.06129
  },
  {
    "Line":"Orange",
    "station":"Oak Grove",
    "lat":42.43668,
    "Long":-71.071097
  },
  {
    "Line":"Orange",
    "station":"Roxbury Crossing",
    "lat":42.331397,
    "Long":-71.095451
  },
  {
    "Line":"Orange",
    "station":"Ruggles",
    "lat":42.336377,
    "Long":-71.088961
  },
  {
    "Line":"Orange",
    "station":"State Street",
    "lat":42.358978,
    "Long":-71.057598
  },
  {
    "Line":"Orange",
    "station":"Stony Brook",
    "lat":42.317062,
    "Long":-71.104248
  },
  {
    "Line":"Orange",
    "station":"Sullivan",
    "lat":42.383975,
    "Long":-71.076994
  },
  {
    "Line":"Orange",
    "station":"Tufts Medical",
    "lat":42.349662,
    "Long":-71.063917
  },
  {
    "Line":"Orange",
    "station":"Wellington",
    "lat":42.40237,
    "Long":-71.077082
  },
  {
    "Line":"Red",
    "station":"Alewife",
    "lat":42.395428,
    "Long":-71.142483
  },
  {
    "Line":"Red",
    "station":"Andrew",
    "lat":42.330154,
    "Long":-71.057655
  },
  {
    "Line":"Red",
    "station":"Ashmont",
    "lat":42.284652,
    "Long":-71.064489
  },
  {
    "Line":"Red",
    "station":"Braintree",
    "lat":42.2078543,
    "Long":-71.0011385
  },
  {
    "Line":"Red",
    "station":"Broadway",
    "lat":42.342622,
    "Long":-71.056967
  },
  {
    "Line":"Red",
    "station":"Central Square",
    "lat":42.365486,
    "Long":-71.103802
  },
  {
    "Line":"Red",
    "station":"Charles/MGH",
    "lat":42.361166,
    "Long":-71.070628
  },
  {
    "Line":"Red",
    "station":"Davis",
    "lat":42.39674,
    "Long":-71.121815
  },
  {
    "Line":"Red",
    "station":"Downtown Crossing",
    "lat":42.355518,
    "Long":-71.060225
  },
  {
    "Line":"Red",
    "station":"Fields Corner",
    "lat":42.300093,
    "Long":-71.061667
  },
  {
    "Line":"Red",
    "station":"Harvard Square",
    "lat":42.373362,
    "Long":-71.118956
  },
  {
    "Line":"Red",
    "station":"JFK/UMass",
    "lat":42.320685,
    "Long":-71.052391
  },
  {
    "Line":"Red",
    "station":"Kendall/MIT",
    "lat":42.36249079,
    "Long":-71.08617653
  },
  {
    "Line":"Red",
    "station":"North Quincy",
    "lat":42.275275,
    "Long":-71.029583
  },
  {
    "Line":"Red",
    "station":"Park Street",
    "lat":42.35639457,
    "Long":-71.0624242
  },
  {
    "Line":"Red",
    "station":"Porter Square",
    "lat":42.3884,
    "Long":-71.119149
  },
  {
    "Line":"Red",
    "station":"Quincy Adams",
    "lat":42.233391,
    "Long":-71.007153
  },
  {
    "Line":"Red",
    "station":"Quincy Center",
    "lat":42.251809,
    "Long":-71.005409
  },
  {
    "Line":"Red",
    "station":"Savin Hill",
    "lat":42.31129,
    "Long":-71.053331
  },
  {
    "Line":"Red",
    "station":"Shawmut",
    "lat":42.29312583,
    "Long":-71.06573796
  },
  {
    "Line":"Red",
    "station":"South Station",
    "lat":42.352271,
    "Long":-71.055242
  },
  {
    "Line":"Red",
    "station":"Wollaston",
    "lat":42.2665139,
    "Long":-71.0203369
  }
];

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();

	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); //Request
	xhr.onreadystatechange = dataReady; //Response
	xhr.send(null);  //Execute!
}

function dataReady() {
	if (xhr.readyState == 4 && xhr.status == 200) {    //4 = complete
		scheduleData = JSON.parse(xhr.responseText);
		line = scheduleData["line"];
		alert(line);
		createMarker();
	}
	else if (xhr.readyState == 4 && xhr.status == 500) {
		alert("Something went wrong - 500 error");
		scheduleDom = document.getElementById("schedule");
		scheduleDom.innerHTML = '<p><img src="http://www.yiyinglu.com/failwhale/images/Homer_the_New_Fail_Whale_by_edwheeler.jpg" alt="fail" /></p>';
		//OR SOMETHING ELSE ??
	}
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
	});
	marker.setMap(map);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
/*
	// Calling Google Places API
	var request = {
		location: me,
		radius: '500',
		types: ['food']
	};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
*/
}

// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
function callback(results, status)
{
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		alert("Got places back!");
		places = results;
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker()
{
	stations.forEach(function(station){
		var tlineCoords = new Array();
		var color;
		if(station.Line.toLowerCase() == line){
			var stationLoc = new google.maps.LatLng(station.lat, station.Long);
			var image = 'pinkmarker.png';
			image.height = '40px';
			image.width = '40px';
			var marker = new google.maps.Marker({
				map: map,
				position: stationLoc,
				icon: image
			});
			google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(station.station);
					infowindow.open(map, this);
			});
			tlineCoords.push(stationLoc);
			//if (line == "red")
			//	color = '#FF0000'
		}
		console.log(tlineCoords);
		var tline = new google.maps.Polyline({
   			path: tlineCoords,
			geodesic: true,
    		strokeColor: '#FF0000',
    		strokeOpacity: 1.0,
    		strokeWeight: 2
  		});
  		tline.setMap(map);
	});
}

