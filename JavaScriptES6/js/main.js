// import message from "introduction";
/////////////////////////
// var vs let
/////////////////////////
let testVar = () => {
  var a = 30
  if (true) {
    var a = 50
    console.log("var a: ", a);
  }
  console.log("var a: ", a);
}

let testLet = () => {
  let a = 30
  if (true) {
    let a = 50
    console.log("let a: ", a);
  }
  console.log("let a: ", a);
}

let loop = (str) => {
  if (str === "let") {
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
  } else if(str === "var") {
    for (var i = 0; i < 10; i++) {
      console.log(i);
    }
  }

  console.log(i);
}

// testVar();
// testLet();
// loop("let");

/////////////////////////
// const
/////////////////////////
const colors = [];

colors.push("red");
colors.push("blue");

// colors = "green"; // Uncaught TypeError: Assignment to constant variable.

// console.log(colors);


/////////////////////////
// class
/////////////////////////
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static countUsers(){
    console.log("There are 50 users");
  }

  register(){
    console.log(this.username, "is now registered");
  }
}

let bob = new User("bob", "bob@mail.com", "adfh");
let boby = new User("boby", "boby@mail.com", "asgf");

// bob.register();
// boby.register();
// User.countUsers();

class Member extends User {
  constructor(username, email, password, memberPackage) {
    super(username, email, password);
    this.package = memberPackage;
  }

  getPackage(){
    console.log(this.username, "has", this.package, "package.");
  }
}

let mike = new Member("mike", "mike@mail.com", "12124", "standard");

// mike.getPackage();
// mike.register();


/////////////////////////
// template string
/////////////////////////
let name = "es6";
let makeUppercase = (word) => {
  return word.toUpperCase();
}
let message = ` <h2>Hello, ${makeUppercase(name)}!</h2>
                <p>ECMAScript 6 (ES6), often referred to as Harmony is the upcoming sixth major release of the ECMAScript language specification. ECMAScript is the proper name for the language commonly referred to as JavaScript.</p>
              `;
document.getElementById('templateString').innerHTML = message;


/////////////////////////
// String Methods
/////////////////////////
let theString = "Hello, I am Humayun and I love ES6.";
let $theString = document.getElementById("theString");
let $theStringChooseFunction = $theString.querySelector(".chooseFunction");
let $check = $theString.querySelector(".check");
let $result = $theString.querySelector(".result");

$theString.querySelector(".string").innerHTML = `theString : ${theString}`;

$check.onclick = () => {
  let sampleString = $theString.querySelector(".sampleString").value;
  let inputString = $theString.querySelector(".inputString").value;

  if(inputString !== ""){
    theString = inputString
  } else {
    theString = "Hello, I am Humayun and I love ES6.";
  }
  $theString.querySelector(".string").innerHTML = `theString : ${theString}`;

  let i = 0;
  for (i in $theStringChooseFunction.children){
    if($theStringChooseFunction.children[i].className.indexOf("active") > 1){
      sampleString = $theString.querySelector(".sampleString").value;
      let functionName = $theStringChooseFunction.children[i].querySelector("input").getAttribute('id');
      if (functionName == "startsWith"){
        $result.innerHTML = `theString.${functionName}("${sampleString}") : ${theString.startsWith(sampleString)}`;
      } else if (functionName == "endsWith"){
        $result.innerHTML = `theString.${functionName}("${sampleString}") : ${theString.endsWith(sampleString)}`;
      } else if (functionName == "includes"){
        $result.innerHTML = `theString.${functionName}("${sampleString}") : ${theString.includes(sampleString)}`;
      }
      break;
    }
  }
}


/////////////////////////
// Number Methods
/////////////////////////
let $theNumber = document.getElementById("theNumber");
$fromDecimal = $theNumber.querySelector("button");

$fromDecimal.onclick = () => {
  let decimalValue = $theNumber.querySelector(".decimal").value;
  if (decimalValue) {
    $theNumber.querySelector(".decimalToBinaryField").value = `0b${(parseInt(decimalValue)).toString(2)}`;
    $theNumber.querySelector(".decimalToOctalField").value = `0o${(parseInt(decimalValue)).toString(8)}`;
    $theNumber.querySelector(".decimalToHexadecimalField").value = `0x${(parseInt(decimalValue)).toString(16)}`;
  }
}
// isNaN, isFinite


/////////////////////////
// Default Params
/////////////////////////
let $defaultParams = document.getElementById("defaultParams");
let $defaultParamsCheck = $defaultParams.querySelector("button");

let defaultParams = (greetings = "Congratulations!!!") => {
  $defaultParams.querySelector(".defaultParamsField").value = greetings;
}
$defaultParamsCheck.onclick = () => {
  let userParamsValue = $defaultParams.querySelector(".userParamsValue").value;
  if(userParamsValue) {
    defaultParams(userParamsValue);
  } else {
    defaultParams();
  }
}


/////////////////////////
// Spread Operator
/////////////////////////
let args1 = [1, 2, 3];
// let args2 = [4, 5, 6];
let args2 = {
  name: 'huka',
  email: 'email',
  password: 'secret'
};

let func = (huka, ...data) => {
  // const {name, password, ...baal} = args2;
  //
  // console.log(name);
  // console.log(baal);
  // console.log(args2);

  console.log(huka);
  console.log(data);
}
// let sum = (a, b, c) => {
//   return a + b + c;
// }
func({name: 'huka'}, {name: 'ani'});
// console.log(sum.apply(null, args1));

// console.log(sum(...args2));


/////////////////////////
// Set, Map, WeakSet and WeakMap
/////////////////////////
/*
let array = [1, 2, 3];
let set = new Set(array);
console.log(set);
set.add("100");
set.add({
  a: 1,
  b: 2,
})
console.log(set);
set.delete(3);
console.log(set);
set.forEach((val) => {
  console.log(val);
});
console.log(set);
console.log(set.size);
set.clear();
*/
/*
let map = new Map([["a1", "Hello"], ["b2", "Goodbye"]]);
map.set("c3", "Ha ha!!");
map.delete("b2");
console.log(map);
console.log(map.size);
*/
/*
let carWeakSet = new WeakSet();
let car1 = {
  make: "Honda",
  model: "Civic",
};
carWeakSet.add(car1);
let car2 = {
  make: "Toyota",
  model: "Camry",
};
carWeakSet.add(car2);
carWeakSet.delete(car1);
console.log(carWeakSet);
*/
/*
let carWeakMap = new WeakMap();
let key1 = {
  id: 1,
}
let car1 = {
  make: "Honda",
  model: "Civic",
};
carWeakMap.set(key1, car1);
let key2 = {
  id: 2,
}
let car2 = {
  make: "Toyota",
  model: "Camry",
};
carWeakMap.set(key2, car2);
carWeakMap.delete(key1);
console.log(carWeakMap);
*/


/////////////////////////
// Arrow Functions
/////////////////////////
// Need to understand
// https://www.youtube.com/watch?v=u4URamXstM0&index=9&list=PLillGF-RfqbZ7s3t6ZInY3NjEOOX7hsBv


/////////////////////////
// Promises
/////////////////////////
// Immediatley Resolved
// let promise = Promise.resolve("Foo");
// promise.then((res) => console.log(res));

/*
let newPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(4), 3000);
});

newPromise.then((res) => {
  res +=3;
  console.log(res);
});
*/

let getData = (method, url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = () => {
      let _this = xhr;
      // console.log(this);
      if(_this.status >= 200 && _this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: _this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: _this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}
/*
getData("GET", "https://jsonplaceholder.typicode.com/photos").then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
*/


/////////////////////////
// Generators
/////////////////////////
// function* g1() {
//   console.log("Hello");
//   yield "Yield 1 Ran..."
//   console.log("World");
//   yield "Yield 2 Ran..."
//   return "Returned.."
// }
//
// let g = g1();
//
// let done = false;
// let yieldResult = {};
// while (!done){
//   yieldResult = g.next()
//   console.log(yieldResult.value);
//   if(yieldResult.done){
//     done = true;
//   }
// }
//
// for(let val of g){
//   console.log(val);
// }
