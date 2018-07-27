$(document).ready(() => {
  const Selector = {
    WINDOW: window,
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
        <img class='user car' src='assets/img/car.png' alt="usr's car"/>
        <img class='car first' src='assets/img/car.png' alt='car'/>
        <img class='car second' src='assets/img/car.png' alt='car'/>
        <img class='car third' src='assets/img/car.png' alt='car'/>
      </div>
    `;
    $(Selector.MAIN).append(template);
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
});
