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

let url = "https://jsonplaceholder.typicode.com/photos";

getData("GET", url).then((data) => {
  let JSONdata = JSON.parse(data);

  let $ajax = document.getElementById("ajax").querySelector(".row");
  let output = ``;

  for (item of JSONdata){
    output += `
      <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4">
        <img src="${item.url}" alt="" class="img-fluid">
        <h6 class="mt-2">${item.title}</h6>
      </div>
    `;
  }
  $ajax.innerHTML = output;
}).catch((err) => {
  console.log(err);
});
