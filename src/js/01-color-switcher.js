const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.disabled = true;
btnStart.addEventListener('click', startColor);
btnStop.addEventListener('click', stopColor);

let timerId = null;

function chgColor() {
  // const newColor
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// **** Start Random Color
function startColor() {
  btnStop.disabled = false;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    chgColor();
  }, 1000);
}

// ***** Stop Color Change
function stopColor() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(timerId);
}
