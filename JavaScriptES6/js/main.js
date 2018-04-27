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
let name = "es6"
let makeUppercase = (word) => {
  return word.toUpperCase();
}
let message = ` <h2>Hello, ${makeUppercase(name)}!</h2>
                <p>ECMAScript 6 (ES6), often referred to as Harmony is the upcoming sixth major release of the ECMAScript language specification. ECMAScript is the proper name for the language commonly referred to as JavaScript.</p>
              `;
document.getElementById('playground').innerHTML = message;
