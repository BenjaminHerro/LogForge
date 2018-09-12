var newTableLine;
var newRowData;
var totalHours = 0;
// var time = new Date('07/20/2018 6:30PM');
var origin = document.querySelector('input#initialO');
var odometer = 71564;
var service = new google.maps.DistanceMatrixService();
let startDate = document.querySelector('input#startD');
let startTime = document.querySelector('input#startT');
var destination;

// const getSydSubs = (nsw,syd) => {
// 	let sydney_suburbs = [];
// 	for (i=0;i<nsw.length;i++) {
// 		if (syd.includes(nsw[i][1])) {
// 			sydney_suburbs.push(nsw[i]);
// 		}
// 	}
// 	return sydney_suburbs;
// };

// sydney_suburbs = getSydSubs(nsw_suburbs,syd_suburbs)

const choice = (choices) => {
	let i = Math.floor(Math.random()*choices.length);
	return choices[i];
};



const calcTimeDifference = (startTime,endTime) => {
	let startTimeHours = startTime.getHours();
	let endTimeHours = endTime.getHours();
	let startTimeMinutes = startTime.getMinutes()/60;
	let endTimeMinutes = endTime.getMinutes()/60;
	let difference = (endTimeHours + endTimeMinutes) - (startTimeHours + startTimeMinutes)
	let diffMinutes = Math.round(Math.round(difference%1*100)/100 * 60)
	let diffHours = parseInt(difference)
	return [diffHours,diffMinutes]
};

class RowObjectT1 {
	constructor(start,from,to,od_before) {
		this.date = start.toLocaleDateString();
		this.start = start.toLocaleTimeString();
		this.finish = finish.toLocaleTimeString();
		this.duration = duration[0].toString() + 'h ' +  duration[1].toString() + 'm';
		this.google_maps(from,to);
		this.from = from;
		this.to = to;
		this.od_before = od_before;
		this.od_after = od_after;
	}

	google_maps(origin,destination) {
		service.getDistanceMatrix(
		  {
		    origins: [this.from],
		    destinations: [this.to],
		    travelMode: 'DRIVING',
		  }, this.callback);
	}

	callback(response, status) {
		console.log(status)
		  if (status == 'OK') {
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;

		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements;
		      for (var j = 0; j < results.length; j++) {
		        var element = results[j];
		        this.distance = element.distance.text;
		        this.duration = element.duration.text;
		        // var from = origins[i];
		        // var to = destinations[j];
	     		}
	   		}
	  	}
	}
};

// class RowObjectT2 {
// 	constructor(road,weather,) {

// 	}

// };

while (totalHours <= 120) {
	// service.getDistanceMatrix(
	// 	  {
	// 	    origins: [this.from],
	// 	    destinations: [this.to],
	// 	    travelMode: 'DRIVING',
	// 	  }, callback);
	newTableRow = document.createElement('tr');
	newRowData = document.createElement('td');

}