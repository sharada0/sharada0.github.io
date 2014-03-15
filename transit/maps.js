var myLat = 42.40;
var myLng = -71.12;
var request;

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
var tline = [];
var line;
var lineColor;

var redLine = [];
var blueLine = [];
var orangeLine = [];

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
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); //Request
	request = new XMLHttpRequest();

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();

	for (var i = stations.length - 1; i >= 0; i--) {
        if (stations[i].line == "Red") {
                redLine.push(stations[i]);
        }
        else if (stations[i].line == "Blue") {
                blueLine.push(stations[i]);
        }
        else if (stations[i].line == "Orange") {
                orangeLine.push(stations[i]);
        }       
	};

	xhr.onreadystatechange = dataReady; //Response
	xhr.send(null);  //Execute!
}

function dataReady() {
	if (xhr.status == 500) {
		alert("Something went wrong, 500 error, refreshing page ...");
		location.reload();
	}
	if (xhr.readyState == 4) {    //4 = complete
		scheduleData = JSON.parse(xhr.responseText);

        if(scheduleData.line == "red") {
        	line = redLine;
        	lineColor = "#ff0000";
        }
        else if(scheduleData.line == "blue") {
        	line = blueLine;
        	lineColor = "#0000ff";
        }
        else if(scheduleData.line == "orange") {
        	line = orangeLine;
        	lineColor = "#ffa500";
        }

		createLines(line);
		closestStation(line);
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
		title: "Current location"
	});
	marker.setMap(map);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
    google.maps.event.addListener(infowindow, 'content_changed', function() {
        infowindow.open(map, marker);
    })
                
    marker.setMap(map);
}

function createLines(tline)
{
	var tlineCoords = [];
	var scheduleString = "";
	for (var j = tline.length - 1; j >= 0; j--) {

		stationLoc = new google.maps.LatLng(tline[j].lat, tline[j].Long);
		var image = 'pinkmarker.png';
		image.height = '40px';
		image.width = '40px';
		var marker = new google.maps.Marker({
			map: map,
			position: stationLoc,
			title: tline[j].station,
			icon: image
		});
		scheduleString = makeScheduleString(tline[j].station);
		var info = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', function(content) {
				return function(){
        			infowindow.setContent(content);
        			infowindow.open(map,this);
    			}
		}(scheduleString));

		marker.setMap(map);  // REMOVE THIS IF NOT NEEDED
		locCoords = new google.maps.LatLng(tline[j].lat, tline[j].Long);

		tlineCoords.push(locCoords);
		//if (line == "red")
		//	color = '#FF0000'
	};
//	console.log(tlineCoords);
	var tline2 = new google.maps.Polyline({
   		path: tlineCoords,
		geodesic: true,
    	strokeColor: lineColor,
    	strokeOpacity: 1.0,
    	strokeWeight: 3
  	});
  	tline2.setMap(map);
}

function closestStation(line)
{
    var closestDist = 999999;
    var closestStation = "";

    Number.prototype.toRad = function() {
    	return this * Math.PI / 180;
    }

	navigator.geolocation.getCurrentPosition(function(position) {
                myLat = position.coords.latitude;
                myLong = position.coords.longitude;

    	for (var i = line.length - 1; i >= 0; i--) {
        	var theLat = line[i].lat; 
        	var theLong = line[i].Long; 
        	var R = 3961; // Earth, miles
        	var x = theLat-myLat;
        	var dLat = x.toRad();  
        	var y = theLong-myLong;
        	var dLon = y.toRad();  
        	var a = (Math.sin(dLat/2)) * (Math.sin(dLat/2)) + (Math.cos(myLat.toRad())) * (Math.cos(theLat.toRad())) * (Math.sin(dLon/2)) * (Math.sin(dLon/2));   
        	var c = 2 * (Math.atan2(Math.sqrt(a), (Math.sqrt(1-a)))); 
        	var d = R * c; 
        	if (d < closestDist) {
            	closestDist = d;
            	closestStation = line[i].station;
        	}
    	};

    	contentString = "<p><strong>Current Location</strong>\
                                 <br>Closest Station: " + closestStation + "<br>Distance: " + closestDist.toFixed(2) + " mi</p>";

	});
}

function makeScheduleString(stat)
{

	var str = "";
	var trip;
	var seconds;
	var dest;
	str += "<strong>" + stat + "</strong>\
			<table> \
			<tr> \
				<th>Line</th>\
				<th>Destination</th>\
				<th>Time Remaining</th>\
			</tr>";

	for (var i = scheduleData.schedule.length - 1; i >= 0; i--) {
		trip = scheduleData.schedule[i];
		for (var j = trip.Predictions.length - 1; j >= 0; j--) {
			if (trip.Predictions[j].Stop == stat) {
				seconds = trip.Predictions[j].Seconds;
				dest = trip.Destination;

				str += "<tr>\
							<td>" + ((scheduleData.line).charAt(0).toUpperCase() + (scheduleData.line).slice(1)) + "</td>\
							<td>" + dest + "</td>\
							<td>" + toMin(seconds) + "</td>\
						</tr>";
			}		
		};
	};

	str += "</table>";
	return str;

}

function toMin(sec)
{
	var minString = "";

	if(sec < 0) {
		minString += "-";
		sec *= -1;	
	}

	var minutes = Math.floor(sec / 60);
	var seconds = sec - minutes * 60;


	if (minutes < 10) {
		minString += "0";
	}
	minString += minutes + ":"

	if (seconds < 10) {
		minString += "0";
	}
	minString += seconds + " min";

	return minString;

}
