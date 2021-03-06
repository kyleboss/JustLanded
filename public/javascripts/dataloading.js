function loadWorldPins( callback ){							
	// We're going to ask a file for the JSON data.
	xhr = new XMLHttpRequest();

	// Where do we get the data?
	xhr.open( 'GET', latlonFile, true );

	// What do we do when we have it?
	xhr.onreadystatechange = function() {
	  // If we've received the data
	  if ( xhr.readyState === 4 && xhr.status === 200 ) {
	      // Parse the JSON
	      latlonData = JSON.parse( xhr.responseText );
	      if( callback )
	      	callback();				     
	    }
	};

	// Begin request
	xhr.send( null );			    	
}

function loadContentData(callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "getTweetsFromDb", false );

	xmlHttp.onreadystatechange = function() {
		if ( xmlHttp.readyState === 4 && xmlHttp.status === 200 ) {
			timeBins = JSON.parse( xmlHttp.responseText ).timeBins;
			for (var i = 0; i < timeBins[0]["data"].length; i++) {
				timeBins[0]["data"][i]["v"] = 3000000;
			}
			console.log(timeBins);
			maxValue = 0;

			startTime = timeBins[0].t;
			endTime = timeBins[timeBins.length-1].t;
			timeLength = endTime - startTime;

			if(callback)
				callback();
		}
	};
	xmlHttp.send( null );
}

function loadCountryCodes( callback ){
	cxhr = new XMLHttpRequest();
	cxhr.open( 'GET', isoFile, true );
	cxhr.onreadystatechange = function() {
		if ( cxhr.readyState === 4 && cxhr.status === 200 ) {
	    	countryLookup = JSON.parse( cxhr.responseText );	
	    	callback();
	    }
	};
	cxhr.send( null );
}