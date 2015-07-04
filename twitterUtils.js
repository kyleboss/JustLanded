module.exports = function(T) {
	var twitter = {}

	twitter.getPreviousTweet = function(tweet) {
		return T.get('statuses/user_timeline', { user_id: tweet["user"]["id"], count: 2 }, 
			function(err, data, response) {
				try {
		  			console.log(data[0]["text"] + "\n**" + data[1]["text"])
		  		} catch(e) {}
		  		return data[1]
			}
		)
	}

	twitter.getDistance = function(geo1, geo2) {
		var R = 3959;
		var φ1 = lat1.toRadians();
		var φ2 = lat2.toRadians();
		var Δφ = (lat2-lat1).toRadians();
		var Δλ = (lon2-lon1).toRadians();

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		        Math.cos(φ1) * Math.cos(φ2) *
		        Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;
		return d
	}

	twitter.isGeoEnabled = function(tweet) {
		console.log(tweet)
		console.log("RETURNINGL: " + tweet["geo_enabled"])
		return tweet["geo_enabled"]
	}

	twitter.isFlight = function(distance) {
		return distance > 100
	}

	twitter.isFirstTweet = function(tweet) {
		return tweet == undefined
	}

	return twitter
}