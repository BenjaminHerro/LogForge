var newTableLine;
var newRowData;
var totalHours = 0;
// var time = new Date('07/20/2018 6:30PM');
var origin = document.querySelector('input#initialO');
var odometer = 71564;
var service = new google.maps.DistanceMatrixService();
let startDate = document.querySelector('input#startD');
let startTime = document.querySelector('input#startT');
var start_time;
var finish_time;
var od_before; 
var od_after;
var destination;
var distance;
var duration;
var row_details;

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

const addMinutes = (date,mins) => {

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function randInt(s,f) {
	return Math.floor(Math.random() * f) + s;
};

function google_maps(origin,destination) {
		service.getDistanceMatrix(
		  {
		    origins: [origin],
		    destinations: [destination],
		    travelMode: 'DRIVING',
		  }, callback);
	}

function callback(response, status) {
		console.log(status)
		  if (status == 'OK') {
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;
		    // console.log(response.rows[0].elements)
		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements;
		      for (var j = 0; j < results.length; j++) {
		        var element = results[j];
		        distance = element.distance.value/1000;
		       	duration = element.duration.value/60;
		       	if (duration > 120) {
		       		return;
		       	}
		       	finish_time = new Date(start.getTime() + Math.round(duration)*60000).toLocaleTimeString();
				od_after = od_before + Math.round(distance);
				if (duration > 60) {
					let duration_hours = 1;
					let duration_mins = (duration-60)*60
					duration = duration_hours.toString() + ' hour ' +  duration_mins.toString() + ' mins';
				} else {
					duration = Math.round(duration)
					duration = duration.toString() + ' mins';
				}
				distance = distance.toString()+' km'
				row_details = [date,start_time,finish_time,duration,origin,destination,od_before,od_after,distance]
				totalHours += duration;
				console.log(totalHours)
				console.log(row_details)
				return;
	     	}
	   	}
	}
};

class RowObjectT1 {
	constructor(start,from,to,od_before) {
		this.date = start.toLocaleDateString();
		this.start = start.toLocaleTimeString();
		// this.finish = finish.toLocaleTimeString();
		// this.duration = duration[0].toString() + 'h ' +  duration[1].toString() + 'm';
		this.google_maps(from,to);
		this.from = from;
		this.to = to;
		this.od_before = od_before;
	}

	google_maps(origin,destination) {
		service.getDistanceMatrix(
		  {
		    origins: [origin],
		    destinations: [destination],
		    travelMode: 'DRIVING',
		  }, this.callback);
	}

	callback(response, status) {
		console.log(status)
		  if (status == 'OK') {
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;
		    // console.log(response.rows[0].elements)
		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements;
		      for (var j = 0; j < results.length; j++) {
		        var element = results[j];
		        distance = element.distance.value/1000;
		       	duration = element.duration.value/60;
	     		}
	   		}
	  	}
	}
};

// class RowObjectT2 {
// 	constructor(road,weather,) {

// 	}

// };

// while (totalHours <= 120) {
// 	// service.getDistanceMatrix(
// 	// 	  {
// 	// 	    origins: [this.from],
// 	// 	    destinations: [this.to],
// 	// 	    travelMode: 'DRIVING',
// 	// 	  }, callback);
// 	newTableRow = document.createElement('tr');
// 	newRowData = document.createElement('td');
// }

// while (totalHours <= 120) {
// 	if (!totalHours) {
// 		origin = 'Caringbah, NSW'
// 		destination = choice(syd_suburbs)
// 		start = new Date('07/06/2018 17:50')
// 		date = start.toLocaleDateString()
// 		start_time = start.toLocaleTimeString()
// 		od_before = 71564;
// 		google_maps(origin,destination)
// 	} else {
// 		origin = destination;
// 		destination = 'Caringbah, NSW'
// 		let start_date = start.addDays(randInt(1,5)).toLocaleDateString();
// 		let start_hours = randInt(7,20).toString();
// 		let start_min = randInt(0,60).toString();
// 		if (parseInt(start_min) < 10) {
// 			start_min = '0'+start_min
// 		}
// 		start = new Date(start_date + start_hours + ':' + start_min)
// 		date = start.toLocaleDateString();
// 		start_time = start.toLocaleTimeString();
// 		od_before = od_after;
// 		google_maps(origin,destination)
// 	}
// }