document.addEventListener('DOMContentLoaded', event => {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDgHxpe6XHzgMM7iMbN06EtuSGX1uchWTQ",
    authDomain: "humayunkabir-carracing.firebaseapp.com",
    databaseURL: "https://humayunkabir-carracing.firebaseio.com",
    projectId: "humayunkabir-carracing",
    storageBucket: "humayunkabir-carracing.appspot.com",
    messagingSenderId: "949462711359"
  };
  firebase.initializeApp(config);
});

/*-----------------------------------------------
|   Get Data
-----------------------------------------------*/
const getData = (collection) => {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  db.collection(collection).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    });
  }).catch(console.log);
};


/*-----------------------------------------------
|   Update User
-----------------------------------------------*/
const updateUser = (event) => {
  getData('users');
};


/*-----------------------------------------------
|   Google Authentication
-----------------------------------------------*/
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then( result => {
      let welcomeTemplate = '';
      if(result.additionalUserInfo.isNewUser){
        welcomeTemplate = `
          <div class="media align-items-center">
            <img class="img-thumbnail rounded-circle img-fluid mr-3" src=${result.additionalUserInfo.profile.picture} alt="profile picture" width="150">
            <div class="media-body">
              <h4>${result.additionalUserInfo.profile.name}</h4>
              <a href='mailto: ${result.additionalUserInfo.profile.email}'>${result.additionalUserInfo.profile.email}</a>
              <a href=${result.additionalUserInfo.profile.link} target="_blank">Google+</a>
              <p class="lead mb-0">Welcome ${result.additionalUserInfo.profile.given_name}!!!</p>
            </div>
          </div>
          <button class="btn btn-success btn-lg mt-6 mx-auto" onclick="startGame()">Play</button>
        `;
      } else {
        welcomeTemplate = `
          <div class="media align-items-center">
            <img class="img-thumbnail rounded-circle img-fluid mr-3" src=${result.additionalUserInfo.profile.picture} alt="profile picture" width="150">
            <div class="media-body">
              <h4>${result.additionalUserInfo.profile.name}</h4>
              <a href='mailto: ${result.additionalUserInfo.profile.email}'>${result.additionalUserInfo.profile.email}</a>
              <a href=${result.additionalUserInfo.profile.link} target="_blank">Google+</a>
              <p class="lead mb-0">Welcome back ${result.additionalUserInfo.profile.given_name}!!!</p>
            </div>
          </div>
          <button class="btn btn-success btn-lg mt-6 mx-auto" onclick="startGame()">Play</button>
       `;
      }
      document.getElementById('app').innerHTML = welcomeTemplate;
    })
    .catch(console.log);
}

function welcome() {
  const additionalUserInfo = {
    isNewUser: true,
    profile: {
      email: "humayunkabir.cep@gmail.com",
      family_name: "kabir",
      gender: "male",
      given_name: "Humayun",
      id: "113570506371993977623",
      link: "https://plus.google.com/+Humayunkabircep",
      locale: "en",
      name: "Humayun kabir",
      picture: "https://lh4.googleusercontent.com/-0EfeQuhKFkM/AAAAAAAAAAI/AAAAAAAAFkc/guW4Fka2r-U/photo.jpg",
      verified_email: true,
    },
    providerId: 'google.com',
  };


  let welcomeTemplate = '';
  console.log(additionalUserInfo.additionalUserInfo);
  if(additionalUserInfo.isNewUser){
    welcomeTemplate = `
      <div class="media align-items-center">
        <img class="img-thumbnail rounded-circle img-fluid mr-3" src=${additionalUserInfo.profile.picture} alt="profile picture" width="150">
        <div class="media-body">
          <h4>${additionalUserInfo.profile.name}</h4>
          <a href=${additionalUserInfo.profile.link} target="_blank">Google+</a>
          <p class="lead mb-0">Welcome back ${additionalUserInfo.profile.given_name}!!!</p>
        </div>
      </div>
    `;
  } else {
    welcomeTemplate = `
      <div class="media align-items-center">
        <img class="img-thumbnail rounded-circle img-fluid mr-3" src=${additionalUserInfo.profile.picture} alt="profile picture" width="150">
        <div class="media-body">
          <h4>${additionalUserInfo.profile.name}</h4>
          <a href=${additionalUserInfo.profile.link} target="_blank">Google+</a>
          <p class="lead mb-0">Welcome ${additionalUserInfo.profile.given_name}!!!</p>
        </div>
      </div>
     `;
  }
  document.getElementById('app').innerHTML = welcomeTemplate;
}





/*-----------------------------------------------
 |   Start Game
 -----------------------------------------------*/
function startGame() {
  const Selector = {
    WINDOW: window,
    APP: '#app',
    MAIN: 'main',
    STREATS: '.streets',
    STREAT: '.streat',
    CAR: '.car',
    USER: '.user',
    FIRST: '.first',
    SECOND: '.second',
    THIRD: '.third',
  };
  const ClassName = {
    STREATS: 'streets',
    STREAT: 'streat',
    CAR: 'car',
    USER: 'user',
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
  };

  const PrepareStreets = () => {
    const template = `
      <div class="streets">
        <div class="street first"></div>
        <div class="street second"></div>
        <div class="street third"></div>
        <div class="street fourth"></div>
        <img class='user car' src='assets/img/car-wolf.svg' alt="usr's car"/>
        <img class='car first' src='assets/img/car-basic.svg' alt='car'/>
        <img class='car second' src='assets/img/car-basic.svg' alt='car'/>
        <img class='car third' src='assets/img/car-basic.svg' alt='car'/>
      </div>
    `;
    document.getElementById('app').innerHTML = template;
  };

  PrepareStreets();
  const streets = $(Selector.STREATS);
  const carUser = $(`${Selector.CAR}${Selector.USER}`);
  const carFirst = $(`${Selector.CAR}${Selector.FIRST}`);
  const carSecond = $(`${Selector.CAR}${Selector.SECOND}`);
  const carThird = $(`${Selector.CAR}${Selector.THIRD}`);
  const D = {
    windowHeight() {
      return $(Selector.WINDOW).height();
    },
    H(a) {
      return a.height();
    },
    dest(c) {
      return  this.H($(Selector.STREATS)) - this.H(c);
    },
  };
  
  TweenMax.fromTo(carUser, 8, { y: 0 }, { y: -D.dest(carUser), ease: Power0.easeNone }).delay(0.5);
  TweenMax.fromTo(carFirst, 6, { y: 0 }, { y: D.dest(carFirst), ease: Power0.easeNone }).delay(0.5);
  TweenMax.fromTo(carSecond, 3, { y: 0 }, { y: D.dest(carSecond), ease: Power0.easeNone }).delay(0.5);
  TweenMax.fromTo(carThird, 7, { y: 0 }, { y: D.dest(carThird), ease: Power0.easeNone }).delay(0.5);
}
