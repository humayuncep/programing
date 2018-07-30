const Selector = {
  WINDOW: window,
  APP: '#app',
  MAIN: 'main',
  STREETS: '.streets',
  STREET: '.streat',
  CAR: '.car',
  USER: '.user',
  FIRST: '.first',
  SECOND: '.second',
  THIRD: '.third',
  COUNTDOWN: '.count-down',
};
const ClassName = {
    STREETS: 'streets',
    STREET: 'streat',
    CAR: 'car',
    USER: 'user',
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
};
const idName = {
    APP: 'app',
};

const app = document.getElementById(idName.APP);
const currentUser = () => firebase.auth().currentUser;

const loginComponent = () => {
    app.innerHTML = `
      <div class='d-flex flex-column'>
        <button class="btn btn-primary" onclick="googleLogin()">Login with Google</button>
        <button class="btn btn-warning" onclick="playAsGuest(event)">Play as Guest</button>
      </div>
    `;
};

const startGameComponent = (user) => {
    app.innerHTML = `
        <div class='d-flex flex-column'>
            <p class="lead">Welcome ${user.displayName}!!!</p>
            <button class="btn btn-warning" onclick="signOut()">Sign out</button>
            <button class="btn btn-danger d-none" onclick="deleteUser(currentUser())">Delete Account</button>
            <button class="btn btn-play mx-auto" onclick="startGame()">Start</button>
        </div>
    `;
};


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

  // Initialize
  initialize();
});


/*-----------------------------------------------
|   Get Current User state and initialize
|   TODO: UPDATE UI
-----------------------------------------------*/
const initialize = () => firebase.auth().onAuthStateChanged(user => user ? startGameComponent(user) : loginComponent());


/*-----------------------------------------------
|   Sign Out
-----------------------------------------------*/
const signOut = () => firebase.auth().signOut().then(() => loginComponent()).catch(console.log);


/*-----------------------------------------------
|   Delete User
-----------------------------------------------*/
const deleteUser = (user) => user.delete().then(() => loginComponent()).catch(console.log);


/*-----------------------------------------------
|   User Record
|   TODO: Make it worked
-----------------------------------------------*/
const userRecord = () => {
    firebase.auth().getUser(user.uid).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
    }).catch(console.log);
};



/*-----------------------------------------------
|   Get Data
-----------------------------------------------*/
const getData = (collection) => {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  // db.collection(collection).get().then(snapshot => {
  //   snapshot.docs.forEach(doc => {
  //     // console.log(doc.data());
  //   });
  // }).catch(console.log);
  return db.collection(collection);
};


/*-----------------------------------------------
|   Update User
-----------------------------------------------*/
const updateUser = (event) => {
  getData('users').get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.data());
    });
  }).catch(console.log);
};


/*-----------------------------------------------
|   Scoreboard
-----------------------------------------------*/
const showScore = (event) => {
  const score = getData('scoreboard').where('email', '==', userInfo.profile.email).get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.data());
    });
  }).catch(console.log);
};


/*-----------------------------------------------
|   Google Authentication
-----------------------------------------------*/
let userInfo;
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then( result => {
      userInfo = result.additionalUserInfo;
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

          <button class="btn btn-primary" onclick="updateUser(event)">Users</button>
          <button class="btn btn-primary" onclick="showScore(event)">Score</button>
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

          <button class="btn btn-primary" onclick="updateUser(event)">Users</button>
          <button class="btn btn-primary" onclick="showScore(event)">Score</button>
          <button class="btn btn-success btn-lg mt-6 mx-auto" onclick="startGame()">Play</button>
       `;
      }
      app.innerHTML = welcomeTemplate;
    })
    .catch(console.log);
}



/*-----------------------------------------------
|   Play as Guest
-----------------------------------------------*/
const playAsGuest = (event) => {
    const element = event.target;
    element.classList.remove('btn-warning');
    element.classList.add('btn-danger');
    element.innerHTML = 'Currently not available';
};
