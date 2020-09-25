# Geolocation Script
An example of Javascript Geolocation on Web

## How to use
You just need to clone it on any directory and execute HTML file with your favorite browser.

## Resume
In this example, I use Javascript to detect your actual location and 
my city's (Pouso Alegre, MG) location. And then, I calculate a distance between them.

For that, I used some functions and APIs, such as:

- navigator.geolocation

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Oops, no geolocation support.");
	}
	
- Error handling

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
   	}
