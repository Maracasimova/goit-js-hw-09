import * as notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const amount = parseInt(event.target.elements.amount.value);
  const delay = parseInt(event.target.elements.delay.value);
  const step = parseInt(event.target.elements.step.value);

  // Создаем указанное количество промисов
  for (let i = 0; i < amount; i++) {
    createPromise(i+1, delay + i * step)
      .then(({ position, delay }) => {
        // Отображаем уведомление в случае успешного выполнения промиса
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // Отображаем уведомление в случае ошибки выполнения промиса
        notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
