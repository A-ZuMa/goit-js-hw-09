import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputFp = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let timerDays = document.querySelector('span[data-days]');
let timerHrs = document.querySelector('span[data-hours]');
let timerMin = document.querySelector('span[data-minutes]');
let timerSec = document.querySelector('span[data-seconds]');

const currentDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - currentDate.getTime() < 0) {
      Notiflix.Report.warning(
        'ATTENTION!',
        'Please choose a date in the future'
      );
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        const timerId = setInterval(() => {
          const timer = new Date();
          const ms = selectedDates[0].getTime() - timer.getTime();
          timerDays.textContent = addLeadingZero(convertMs(ms).days);
          timerHrs.textContent = addLeadingZero(convertMs(ms).hours);
          timerMin.textContent = addLeadingZero(convertMs(ms).minutes);
          timerSec.textContent = addLeadingZero(convertMs(ms).seconds);
          startBtn.disabled = true;
          if (ms < 1000) {
            clearInterval(timerId);
            Notiflix.Report.success('BOOOOOOOOM!', 'Have a Great day');
          }
        }, 1000);
      });
    }
  },
};

flatpickr(inputFp, options);

// function addLeadingZero(number) {
//   return ('0' + number).slice(-2);
// }
function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
