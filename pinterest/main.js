/////////////////////////
// AJAX with Promise
/////////////////////////
let getData = (method, username = "humayunkabircep") => {
  let url = `https://api.rss2json.com/v1/api.json?rss_url=https://www.pinterest.com/${username}/feed.rss`
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

let showItems = (username) => {
  getData("GET", username).then((data) => {
    let JSONdata = JSON.parse(data);
    let $ajax = document.getElementById("pinterest").querySelector(".row");
    $output = ``;
    for (item of JSONdata.items){
      $output += `
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4">
          <img src="${item.thumbnail}" alt="" class="img-fluid">
          <h6 class="mt-2">${item.title}</h6>
          <p>${item.pubDate}</p>
        </div>
      `;
    }
    $ajax.innerHTML = $output;
  }).catch((err) => {
    document.getElementById("pinterest").querySelector(".row").innerHTML =  `<div class="alert alert-danger" role="alert">Enter a valid username</div>`
  });
}
showItems();
let $user = document.getElementById("user");
$user.querySelector("span").onclick = () => {
  let username = $user.querySelector("input").value;
  (username != "") && showItems(username);
}
