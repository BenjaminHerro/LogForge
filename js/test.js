let s = new Date('06/06/2018 15:35')
let e = new Date('06/06/2018 18:20')

class Test{
	constructor(date,start,end){
		this.date = date.toLocaleDateString();
		this.start=start.toLocaleTimeString();
		this.end = end.toLocaleTimeString();
	}
}

let t = new Test(s,s,e)

console.log(t)