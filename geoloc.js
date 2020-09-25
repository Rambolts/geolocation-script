var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

var myCoords = {
   latitude: -22.223,
   longitude: -45.95
};

window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Oops, no geolocation support.");
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var p, span;

	var div = document.getElementById("location");
		
		//Latitude
	p = document.createElement("p");
	p.innerHTML = "Latitude: ";
	span = document.createElement("span");
	span.innerHTML = latitude.toFixed(2);
	
	p.appendChild(span);
	div.appendChild(p);
	
		//Longitude	
	p = document.createElement("p");
	p.innerHTML = "Longitude: ";
	span = document.createElement("span");
	span.innerHTML = longitude.toFixed(2);
	
	p.appendChild(span);
	div.appendChild(p);
	
		//Distance 
   var km = computeDistance(position.coords, myCoords);
	var distance = document.getElementById("distance");
	p = document.createElement("p");
	p.innerHTML = km.toFixed(1) + "km";
	distance.appendChild(p);

	//decimalToDegrees(latitude, longitude);
}

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not avaliable",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	
	if (error.code == 0 || error.code == 2){
		errorMessage += " " + error.message;
	}

	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

// ----------------------------------------------------
// ----------- To Degree, Minutes, Seconds ------------

function decimalToDegrees(lat, lng) {
	var latResult, lngResult, dmsResult;

	lat = parseFloat(lat);
	lng = parseFloat(lng);

	latResult = (lat >= 0) ? 'N' : 'S';
	latResult += getDms(lat);

	lngResult = (lng >= 0) ? 'L' : 'O';
	lngResult += getDms(lng);

	alert(latResult);
	alert(lngResult);
}

function getDms(val) {
	var valDeg, valMin, valSec, result;

	val = Math.abs(val);
	valDeg = Math.floor(val);
	result = " " + valDeg + "º";

	valMin = Math.floor((val - valDeg) * 60);
	result += " " + valMin + "'";

	valSec = Math.round((val - valDeg - valMin /60) * 3600);
	result += " " + valSec + '"';

	return result;
}

// --------------------- Ready Bake ------------------
//
// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points
//
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

