/*-----------------------------------------------
|   COMPONENTS
-----------------------------------------------*/
const gameInterfaceComponent = (carName = 'dragon') => {
  app.innerHTML = `
    <div class='streets'>
      <div class='count-down'><span></span></div>
      <div class='street first'></div>
      <div class='street second'></div>
      <div class='street third'></div>
      <div class='street fourth'></div>
      <img class='user car' src='assets/img/car-${carName}.svg' alt='usr car'/>
    </div>
  `;
};

const loginComponent = () => {
  // <button class='btn btn-warning' onclick='playAsGuest(event)'>Play as Guest</button>
  // <button class='btn btn-warning' onclick='startGame()'>Play as Guest</button>
  app.innerHTML = `
    <div class='d-flex flex-column'>
      <button class='btn btn-primary' onclick='googleLogin()'>Login with Google</button>
      <button class='btn btn-warning' onclick='playAsGuest(event)'>Play as Guest</button>
    </div>
  `;
};

const loggedInComponent = (user) => {
  app.innerHTML = `
    <div class='d-flex flex-column'>
      <p class='lead'>Welcome ${user.displayName}!!!</p>
      <button class='btn btn-warning' onclick='signOut()'>Sign out</button>
      <button class='btn btn-primary' onclick='profileComponent(currentUser())'>Profile</button>
      <button class='btn btn-danger d-none' onclick='deleteUser(currentUser())'>Delete Account</button>
      <button class='btn btn-play mx-auto' onclick='startGame()'>Start</button>
    </div>
  `;
};

const profileComponent = (user) => {
  app.innerHTML = `
    <div class='d-flex flex-column text-center'>
      <img class="avatar mx-auto" src=${user.photoURL} alt="profile picture" width="150">
      <h1>${user.displayName}</h1>
      <a href='mailto:${user.email}'>${user.email}</a>
      <p class="lead mb-0">Welcome ${user.displayName.split(' ')[0]}!!!</p>
      <div>
        <button class="btn btn-primary" onclick="loggedInComponent(currentUser())">Back</button>
        <button class="btn btn-warning" onclick="showScore(event)">Score</button>
      </div>
      <button class="btn btn-play mx-auto" onclick="startGame()">Play</button>
    </div>
  `;
};
