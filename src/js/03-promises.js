import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name = "delay"]'),
  step: document.querySelector('input[name = "step"]'),
  amount: document.querySelector('input[name = "amount"]'),
  btnSubmit: document.querySelector("[type='submit']"),
};

elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  let delay = Number(elements.delay.value);
  // console.log(delay);
  const step = Number(elements.step.value);
  // console.log(step);
  const amount = Number(elements.amount.value);
  // console.log(amount);

  for (let i = 1; i <= amount; i += 1) {
    // const position = i;
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
