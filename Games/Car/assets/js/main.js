$(document).ready(() => {
  const Selector = {
    WINDOW: window,
    STREATS: '.streets',
    STREAT: '.streat',
    CAR: '.car',
  };
  const ClassName = {
    CAR: 'car',
  };
  
  const streets = $(Selector.STREATS);
  streets.append(`<img class=${ClassName.CAR} src='assets/img/car.png' alt=${ClassName.CAR}/>`);
  
  const car = $(Selector.CAR);
  const windowHeight = $(Selector.WINDOW).height();
  const carLength = car.height();
  const dest = { y:  carLength - windowHeight };
  
  TweenMax.fromTo(car, 8, { y: 0 }, { y: dest.y, ease: Bounce.easeOut }).delay(0.5);
});
