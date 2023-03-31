function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {
  // Делаем кнопку Start неактивной и кнопку Stop активной
  startButton.disabled = true;
  stopButton.disabled = false;

  // Запускаем таймер, который меняет цвет фона раз в секунду
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  // Делаем кнопку Stop неактивной и кнопку Start активной
  startButton.disabled = false;
  stopButton.disabled = true;

  // Останавливаем таймер
  clearInterval(intervalId);
}