/*-----------------------------------------------
|   FUNCTIONS
-----------------------------------------------*/
const getCurrentPosition = (element) => element.getBoundingClientRect();


/*-----------------------------------------------
|   Start Game
-----------------------------------------------*/
function gameInterfacePrepare() {
  return new Promise(resolve => {
    gameInterfaceComponent();
    const countDouwn = document.querySelector(Selector.COUNTDOWN);
    const countDouwnElement = countDouwn.querySelector('span');
    let timer = 4;
    const countDowner = setInterval(() => {
      if(timer <= 0) {
        clearInterval(countDowner);
        countDouwn.outerHTML = '';
        gameController();
        // drag(Selector.CARUSER, Selector.STREETS);
        resolve(timer)
    }
    timer -= 1;
    countDouwnElement.innerText = `${timer !== 0 ? timer : 'GO'}`;
    TweenMax.fromTo(countDouwn, 1, { scale: 1, opacity: 1 }, { scale: 0.25, opacity: 0, ease: Expo.easeInOut });
    }, 1000);
  });
}

const Utils = {
  getHeight(a) {
    return a.offsetHeight;
  },
  dest(c, p) {
    return  this.getHeight(p) - this.getHeight(c);
  },
};

const opponentCarAnimation = (car, duration = Math.random() * 10, delay = Math.random(), streets = document.querySelector(Selector.STREETS)) => {
  console.log('duration: ', duration, ' delay: ', delay);
  TweenMax.fromTo(car, duration, { y: 0 }, { y: Utils.dest(car, streets), ease: Power0.easeNone }).delay(delay);
};

const opponentCarIntroduced = () => {
  const streets = document.querySelector(Selector.STREETS);
  const lane = ['first', 'second', 'third', 'fourth'];
  streets.innerHTML += `
      <img class='car ${lane[0]}' src='assets/img/car-basic.svg' alt='car'/>
      <img class='car ${lane[1]}' src='assets/img/car-basic.svg' alt='car'/>
      <img class='car ${lane[2]}' src='assets/img/car-basic.svg' alt='car'/>
      <img class='car ${lane[3]}' src='assets/img/car-basic.svg' alt='car'/>
  `;
  const carFirst = document.querySelector(`${Selector.CAR}${Selector.FIRST}`);
  const carSecond = document.querySelector(`${Selector.CAR}${Selector.SECOND}`);
  const carThird = document.querySelector(`${Selector.CAR}${Selector.THIRD}`);
  const carFourth = document.querySelector(`${Selector.CAR}${Selector.FOURTH}`);
  opponentCarAnimation(carFirst);
  opponentCarAnimation(carSecond);
  opponentCarAnimation(carThird);
  opponentCarAnimation(carFourth);
};


async function startGame() {
  await gameInterfacePrepare();
  opponentCarIntroduced();
}


/*-----------------------------------------------
|   Controller
-----------------------------------------------*/
const gameController = () => {
  const streets = document.querySelector(Selector.STREETS);
  const userCar = document.querySelector(Selector.CARUSER);
  const SL = getCurrentPosition(streets);
  const CCL = getCurrentPosition(userCar);
  const right = SL.width - CCL.width;
  const top = SL.height - CCL.height;
  const distance = 16;
  let CL = { left: 0, bottom: 0 };

  document.addEventListener('keydown', event => {
    const { key } = event;

    switch (key) {
      case 'ArrowRight':
        if (CL.left < right) CL.left += distance;
        break;
      case 'ArrowLeft':
        if (CL.left > 0) CL.left -= distance;
        break;
      case 'ArrowDown':
        if (CL.bottom > 0) CL.bottom -= distance;
        break;
      case 'ArrowUp':
        if (CL.bottom < top) CL.bottom += distance;
        break;
    }
    $(Selector.CARUSER).css(CL);
  });
};

/*-----------------------------------------------
|   Draggable Element in a Container
-----------------------------------------------*/
const drag = (element, container, gridWidth = 200, gridHeight = 200) => {
  Draggable.create(element, {
    type: 'x, y',
    edgeResistance: 0.65,
    bounds: container,
    lockAxis: true,
    throwProps: true,
    liveSnap: false,
    snap: {
      x: function(endValue) {
        return Math.round(endValue / gridWidth) * gridWidth;
      },
      y: function(endValue) {
        return Math.round(endValue / gridHeight) * gridHeight;
      }
    }
  });
};
