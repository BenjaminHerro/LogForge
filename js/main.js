var newTableLine;
var newRowData;
var totalDayHours = 0;
var totalNightHours = 0;
var totalHours = 0;
var totalWeatherCalls = 0;

var originInp = document.querySelector('input#originInp');
var startDateInp = document.querySelector('input#dateInp');
var startTimeInp = document.querySelector('input#timeInp');
var calcButton = document.querySelector('input.calc-button');
var nextEntryButton = document.createElement('input');
var newHomeInp = document.createElement('input');
var goHome = document.createElement('input');
var home;
var newPageButton = document.createElement('input');
let weatherAPIurl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6098907e1e7c8584176809effa15fa8e/'

var odometer = 71564;
var service = new google.maps.DistanceMatrixService();
var dateObj;
var road;
var weather;
var traffic;
var coords;
var timeInt;

var mainTableFirst = document.querySelector('table.main-table-part1 tbody')
var mainTableSecond = document.querySelector('table.main-table-part2 tbody')
var totalData = [];
var date;
var startTime;
var origin;
var finishTime;
var od_before; 
var od_after;
var destination;
var distance;
var duration;
var row_details;

const maxWeatherCalls = 850;
const getSydSubs = (nsw,syd) => {
	let sydney_suburbs = {};
	for (i=0;i<nsw.length;i++) {
		if (syd.includes(nsw[i][1])) {
			sydney_suburbs[nsw[i][1]] = [nsw[i][nsw[i].length-2],nsw[i][nsw[i].length-1]]
		}
	}
	return sydney_suburbs;
};

sydney_suburbs = getSydSubs(nsw_suburbs,syd_suburbs)

const _24_hour_conversions = {
	'1':'13','2':'14','3':'15','4':'16','5':'17','6':'18',
	'7':'19','8':'20','9':'21','10':'22','11':'23','12':'00',
}

const _24_hour_conversions_opp = {
	'12':'12','13':'1','14':'2','15':'3','16':'4','17':'5','18':'6',
	'19':'7','20':'8','21':'9','22':'10','23':'11','00':'12',
}

const choice = (choices) => {
	let i = Math.floor(Math.random()*choices.length);
	return choices[i];
};

const split = (item,on) => {
	return [item.slice(0,item.indexOf(on)),item.slice(item.indexOf(on)+1)]
};

const getTime = (hours,mins) => {
	let meridiem;
	if (hours < 12) {meridiem = ' AM';} else {meridiem = ' PM';}
	hours = hours.toString()
	mins = mins.toString()
	if (meridiem == ' PM') {
		hours = _24_hour_conversions_opp[hours];
	}
	if (hours.length == 1) {hours = '0'+hours;}
	if (mins.length == 1) {mins = '0'+mins;}
	return hours+':'+mins+':'+'00'+meridiem;
};

const getDate = () => {
	return randInt(6,11).toString() + '/' + randInt(1,30).toString() + '/' + '2018'
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Date.prototype.addDays = function(days) {
    let d = new Date(this.valueOf());
    d.setDate(d.getDate() + days);
    return d;
};

Date.prototype.timeOfDay = function() {
	let currentTime = this.toLocaleTimeString()
	if (currentTime.indexOf('PM') >= 0 && parseInt(currentTime[0]) >= 6) {
		return 'night';
	}
	return 'day';
};

Date.prototype.addMinutes = function(mins) {
	let m = new Date(this.valueOf());
	m.setMinutes(m.getMinutes() + mins);
	return m
};

function setNextButtons() {
	let divHolder = document.createElement('div');
	$(divHolder).addClass('new-buttons-div');
	$(newHomeInp).addClass('next-inputs').attr('type','text').attr('placeholder','Enter new origin').attr('id','new-origin');
	$(nextEntryButton).addClass('next-inputs').attr('type','button').val('Next Entry');
	$(goHome).addClass('next-inputs').attr('type','checkbox');
	$(newPageButton).addClass('next-inputs').attr('id','new-page-but').attr('type','button').val('New Page');
	divHolder.appendChild(newHomeInp).parentNode.appendChild(nextEntryButton).parentNode.appendChild(goHome).parentNode.appendChild(newPageButton);
	document.querySelector('div.container-part2').parentNode.appendChild(divHolder);
};

function randInt(from,to) {
	return Math.floor(Math.random() * (to-from)) + from;
};

// async function getWeather (coords,time,callback) {
// 	let http = new XMLHttpRequest();
// 	let lat = coords[0].toString();
// 	let long = coords[1].toString();
// 	let url = weatherAPIurl + lat + ',' + long + ',' + time.toString()
// 	http.open("GET", url);
// 	http.send();
// 	let weatherData = await JSON.parse(http.responseText)
// 	return weatherCallback(weatherData)
// };

// function weatherCallback (response) {
// 	let newRowSecond = document.createElement('tr');
// 	newRowSecond.className = 'new-row-second';
// 	let dataSecond = [];
//    	let durCheck = parseInt(duration.slice(0,duration.indexOf(' mins')));
//    	if (durCheck < 15) {
//    		road = choice(['Q','S','MR']);
//    	} else if (durCheck >= 15 && durCheck < 30) {
//    		road = choice(['MR','ML']);
//    	} else {
//    		road = 'ML';
//    	}

//    	if (totalWeatherCalls < maxWeatherCalls-3) {
//    		let currentWeather = response['currently']['summary'];
//    	} else {
//    		weather = choice(['Fine','Raining','Foggy'])
//    	}
//    	// weather = choice(['Fine','Raining','Foggy'])
//    	traffic = choice(['Light','Moderate','Heavy'])

//    	dataSecond.push(road,weather,traffic,totalDayHours,totalNightHours,totalHours,'16170965');

//    	for (i=0;i<dataSecond.length;i++) {
//    		let d = document.createElement('td')
//    		d.innerHTML = dataSecond[i]
//    		newRowSecond.appendChild(d)
//    	}
//    	mainTableSecond.appendChild(newRowSecond)
// };

// function weatherAPI(coords,time) {
// 		getWeather(coords,time,weatherCallback)
// }

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
		  	let newRowFirst = document.createElement('tr');
		  	newRowFirst.className = 'new-row-first';
		  	let newRowSecond = document.createElement('tr');
			newRowSecond.className = 'new-row-second';
		  	startTime = dateObj.toLocaleTimeString()
		  	if (startTime.indexOf(':') == 1) {
		  		let midSec = Math.ceil(parseInt((startTime.slice(2,4))/5)*5).toString()
		  		if (midSec.length == 1) {
		  			startTime = startTime.slice(0,2) + '0'+midSec + startTime.slice(4)
		  		} else {
		  			startTime = startTime.slice(0,2) + midSec + startTime.slice(4)
		  		}
		  	} else {
		  		let midSec = Math.ceil(parseInt((startTime.slice(3,5))/5)*5).toString()
		  		if (midSec.length == 1) {
		  			startTime = startTime = startTime.slice(0,3) + '0'+midSec + startTime.slice(5)
		  		} else {
		  			startTime = startTime = startTime.slice(0,3) + midSec + startTime.slice(5)
		  		}
		  	}
		  	dateObj = new Date(dateObj.toLocaleDateString() + ' ' + startTime);
		  	let dataFirst = [dateObj.toLocaleDateString(),startTime];
		    var origins = response.originAddresses;
		    var destinations = response.destinationAddresses;
		    // console.log(response.rows[0].elements)
		    for (var i = 0; i < origins.length; i++) {
		      var results = response.rows[i].elements;
		      for (var j = 0; j < results.length; j++) {
		        var element = results[j];
		        console.log(element)
		        distance = Math.round(element.distance.value/1000,2);
		       	duration = element.duration.value/60;
		       	finishTime = dateObj.addMinutes(Math.round(duration)).toLocaleTimeString()
		       	dateObj = new Date(dateObj.toLocaleDateString() + ' ' + finishTime);
		       	dateObj.addMinutes(randInt(30,120));
		       	console.log(dateObj);
		       	console.log(dateObj.timeOfDay());
		        dataFirst.push(finishTime)
		       	if (dateObj.timeOfDay() == 'day') {
		       		totalDayHours += duration
		       	} else {
		       		totalNightHours += duration
		       	}
		       	console.log('Day hours:', totalDayHours)
		       	console.log('Night hours:', totalNightHours)
		       	totalHours += duration;
		       	if (totalHours>6000) {
		       		return totalHours;
		       	}
		       	console.log(duration)
		       	if (duration > 120) {
		       		alert('The duration was too long:',duration)
		       		return;
		       	}
				if (duration > 60) {
					let duration_hours = 1;
					let duration_mins = Math.round((duration-60))
					duration = duration_hours.toString() + ' hour ' +  duration_mins.toString() + ' mins';
				} else {
					duration = Math.round(duration)
					duration = duration.toString() + ' mins';
				}
				dataFirst.push(duration)
				dataFirst.push(origins)
				dataFirst.push(destinations)
				dataFirst.push(odometer)
				odometer += distance
				dataFirst.push(odometer)
				dataFirst.push(distance.toString()+' km')
		       	totalData.push(dataFirst)

		       	let dataSecond = [];
			   	let durCheck = parseInt(duration.slice(0,duration.indexOf(' mins')));
			   	if (durCheck < 15) {
			   		road = choice(['Q','S','MR']);
			   	} else if (durCheck >= 15 && durCheck < 30) {
			   		road = choice(['S','MR','ML']);
			   	} else {
			   		road = choice(['MR','ML', 'MR, ML']);
			   	}
			   	weather = choice(['Fine','Raining','Foggy'])
			   	traffic = choice(['Light','Moderate','Heavy'])

			   	let dayHours = (Math.round(totalDayHours/60*100)/100).toString()
			   	let nightHours = (Math.round(totalNightHours/60*100)/100).toString()
			   	let tHours = (Math.round(totalHours/60*100)/100).toString()

			   	if (totalDayHours != 0) {
			   		dayHours = split(dayHours,'.');
			   		console.log(dayHours)
			   		let totalDayH = dayHours[0];
			   		let totalDayM = (Math.round(parseFloat('0.'+dayHours[1]) * 60)).toString();
			   		dayHours = totalDayH + ' hours ' +  totalDayM + ' mins';
			   	}
			   	if (totalNightHours != 0) {
			   		nightHours = split(nightHours,'.');
			   		console.log(nightHours)
			   		let totalNightH = nightHours[0];
			   		let totalNightM = (Math.round(parseFloat('0.'+nightHours[1]) * 60)).toString();
			   		nightHours = totalNightH + ' hours ' +  totalNightM + ' mins';
			   	}
			   	if (totalHours != 0) {
			   		tHours = split(tHours,'.');
			   		let totalH = tHours[0];
			   		let totalM = (Math.round(parseFloat('0.'+tHours[1]) * 60)).toString();
			   		tHours = totalH + ' hours ' +  totalM + ' mins';
			   	} 

			   	dataSecond.push(road,weather,traffic,dayHours,nightHours,tHours,'16170965');

		       	for (i=0;i<dataFirst.length;i++) {
		       		let d = document.createElement('td')
		       		d.innerHTML = dataFirst[i]
		       		newRowFirst.appendChild(d)
		       	}

		       	for (i=0;i<dataSecond.length;i++) {
			   		let d = document.createElement('td')
			   		d.innerHTML = dataSecond[i]
			   		newRowSecond.appendChild(d)
			   	}
		       	mainTableFirst.appendChild(newRowFirst)
		       	mainTableSecond.appendChild(newRowSecond)

	     		}
	     	}
	   	}
};

window.onload = function() {
	$(document.querySelector('div.container-part1')).hide();
	$(document.querySelector('div.container-part2')).hide();
};

$(calcButton).click(e => {
	let newButtonsCheck = document.querySelectorAll('.next-inputs');
	dateObj = new Date(startDateInp.value + ' ' + startTimeInp.value);
	origin = originInp.value;
	home = originInp.value;
	if (origin == '') {
		alert('You must enter a home start point, dingus');
		return;
	}
	console.log('Home:',home)
	destination = choice(syd_suburbs);
	google_maps(origin,destination);
	// coords = sydney_suburbs[destination];
 //   	timeInt = dateObj.getTime()/1000;
	// weatherAPI(coords,timeInt);
	if (newButtonsCheck.length == 0) {setNextButtons();}
	$('.init-form').slideUp(1000);
	$(document.querySelector('div.container-part1')).slideDown(1000);
	$(document.querySelector('div.container-part2')).slideDown(1000);
});

$(nextEntryButton).click(e => {
	if (dateObj.toLocaleDateString() == 'Invalid Date') {
		date = getDate();
		time = getTime(randInt(8,20),randInt(0,59));
		dateObj = new Date(date + ' ' +time);
	};
	startTime = startTimeInp.value;
	if ($(goHome).is(':checked')) {
		if (destination == home){alert("You can't return home if you're already home, dingus. Uncheck the box.")}
			else {
				origin = destination;
				destination = home;
				google_maps(origin,destination);
			}
	} else if (newHomeInp.value != '') {
		date = dateObj.addDays(randInt(1,10)).toLocaleDateString()
		startTime = getTime(randInt(8,20),randInt(0,59));
		dateObj = new Date(date + ' ' + startTime)
		origin = newHomeInp.value
		home = newHomeInp.value
		newHomeInp.value = ''
		destination = choice(syd_suburbs);
		google_maps(origin,destination);
	} else {
		date = dateObj.addDays(randInt(1,10)).toLocaleDateString()
		startTime = getTime(randInt(8,20),randInt(0,59));
		console.log(startTime)
		dateObj = new Date(date + ' ' + startTime)
		origin = 'Caringbah, NSW';
		home = 'Caringbah, NSW';
		destination = choice(syd_suburbs);
		google_maps(origin,destination);
		// coords = sydney_suburbs[destination];
  //  		timeInt = dateObj.getTime()/1000;
		// weatherAPI(coords,timeInt);
	}
});

$(newPageButton).click(e => {
	let lastEntriesFirst = document.querySelectorAll('tr.new-row-first');
	let tableFirst = document.querySelector('table.main-table-part1 tbody');
	let lastEntriesSecond = document.querySelectorAll('tr.new-row-second');
	let tableSecond = document.querySelector('table.main-table-part2 tbody');
	$(lastEntriesFirst).slideUp(1000, () => {
		for (i=0;i<=lastEntriesFirst.length;i++){
			tableFirst.removeChild(lastEntriesFirst[i])}
		});
	$(lastEntriesSecond).slideUp(1000, () => {
		for (i=0;i<=lastEntriesSecond.length;i++){
			tableSecond.removeChild(lastEntriesSecond[i])}
		});
});