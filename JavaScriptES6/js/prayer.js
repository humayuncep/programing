/////////////////////////
// AJAX with Promise
/////////////////////////
let getData = (method, url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function() {
			if(this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText,
				});
			}
		};
		xhr.onerror = () => {
			reject({
				status: this.status,
				statusText: xhr.statusText,
			});
		};
		xhr.send();
	});
}

let currentlocation = () => navigator.geolocation.getCurrentPosition(function(position) {
	return ({
		"latitude": position.coords.latitude,
		"longitude": position.coords.longitude
	});
})

let newUrl = (latitude = 24.9094395, longitude = 91.8331254, date = "2018-05") => {
	let month = date.split("-")[1];
	let year = date.split("-")[0];
	return `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${year}`;
};

let userFrom = document.getElementById("userFrom");
userFrom.querySelector("button").onclick = () => {
	let latitude = userFrom.querySelector(".latitude").value || undefined;
	let longitude = userFrom.querySelector(".longitude").value || undefined;
	let date = userFrom.querySelector(".date").value || undefined;

	showResult(newUrl(latitude, longitude, date));
};

let url = newUrl();

let showResult = (url) => {
	getData("GET", url).then((data) => {
		let JSONdata = JSON.parse(data);
		let $ajax = document.getElementById("ajax").querySelector(".row.app");
		let output = ``;
		let formatedData = JSONdata.data.map(day => ({
			"timings": day.timings,
			"timezone": day.meta.timezone,
			"date": day.date.readable
		}));

		let timings = (obj) =>  {
			let out = "";
			for (time in obj){
				out += `
	      ${time} : ${obj[time]}
	    `;
			}
			return out;
		}

		for (item of formatedData){
			output += `
      <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4">
        <h6 class="mt-2">${item.date}</h6>
        <h6 class="mt-2">${item.timezone}</h6>
        ${timings(item.timings)}
      </div>
    `;
		}

		$ajax.innerHTML = output;
	}).catch((err) => {
		console.log(err);
	});
}
showResult(url);
