var newTableLine;
var newRowData;
var totalHours = 0;
var time = new Date('07/20/2018 6:30PM');
var caringbah = {lat: -34.0452, lng: 151.1218}

const addRow = (previousDate) => {

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
	constructor(date,start,finish,from,to,od_before,od_after,distance) {
		let duration = calcTimeDifference(start,finish);
		this.date = date;
		this.start=start.toLocaleTimeString();
		this.finish = finish.toLocaleTimeString();
		this.duration = duration[0].toString() + 'h ' +  duration[1].toString() + 'm';
		this.from = from;
		this.to = to;
		this.od_before = od_before;
		this.od_after = od_after;
	}

};

class RowObjectT2 {
	constructor(road,weather,) {

	}

};

while (totalHours <= 120) {
	newTableRow = document.createElement('tr');
	newRowData = document.createElement('td');

}