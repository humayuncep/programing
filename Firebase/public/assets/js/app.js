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
  FOURTH: '.fourth',
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
  FOURTH: 'fourth',
};
const idName = {
  APP: 'app',
};


const app = document.getElementById(idName.APP);
const currentUser = () => firebase.auth().currentUser;

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
const initialize = () => firebase.auth().onAuthStateChanged(user => user ? loggedInComponent(user) : loginComponent());


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
  console.log(user);
};



/*-----------------------------------------------
|   Get Data
-----------------------------------------------*/
const getData = (collection) => {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  // db.collection(collection).get().then(snapshot => {
  //   console.log('All users data: ');
  //   snapshot.docs.forEach(doc => {
  //     console.log(doc.data());
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
  const element = event.target;
  const score = getData('users').where('email', '==', currentUser().email).get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('Current user data: ', data);
      element.innerText = data.score;
    });
  }).catch(console.log);
};


/*-----------------------------------------------
|   Google Authentication
-----------------------------------------------*/
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then( result => {
    userInfo = result.additionalUserInfo;
    profileComponent(result);
  }).catch(console.log);
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
