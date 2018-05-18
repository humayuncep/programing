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
// = "https://jsonplaceholder.typicode.com/photos"
let url = "http://api.aladhan.com/v1/calendar?latitude=24.9094395&longitude=91.8331254&method=2&month=5&year=2018";

getData("GET", url).then((data) => {
  let JSONdata = JSON.parse(data);
  console.log(JSONdata);
  let $ajax = document.getElementById("ajax").querySelector(".row");
  let output = ``;
	let formatedData = JSONdata.data.map(day => ({
	    "timings": day.timings,
      "timezone": day.meta.timezone,
      "date": day.date.readable
    }));

	let timings = (obj) =>  {
	  let out = "";
		console.log(obj);
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

  // for (item of myData){
  //   $output += `
  //     <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4">
  //       <img src="${item.url}" alt="" class="img-fluid">
  //       <h6 class="mt-2">${item.title}</h6>
  //     </div>
  //   `;
  // }
  $ajax.innerHTML = output;
}).catch((err) => {
  console.log(err);
});
