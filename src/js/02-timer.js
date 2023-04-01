import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      return;
    }

    const startBtn = document.getElementById("start-btn");
    startBtn.disabled = false;
  },
};

const dateTimePicker = flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function startTimer() {
  const selectedDate = dateTimePicker.selectedDates[0];
  const timerElem = document.getElementById("timer");
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = selectedDate.getTime() - currentDate.getTime();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerElem.textContent = "00:00:00:00";
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    timerElem.textContent = `${addLeadingZero(days)}:${addLeadingZero(
      hours
    )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
  }, 1000);
}

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startTimer);

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