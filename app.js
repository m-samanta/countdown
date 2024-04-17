let cancelId;
let startTime;
let savedTime = 0;
const countdown = 30 * 60 * 1000;
const timerMilliseconds = document.querySelector(".timer__milliseconds");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMinutes = document.querySelector(".timer__minutes");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");


function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startTime = Date.now();
  cancelId = setInterval(updateTimer, 1000 / 60)
//   cancelId = requestAnimationFrame(updateTimer);
}
function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);
  clearInterval(cancelId);
}
function resetTimer() {
  startTime = Date.now();
  savedTime = 0;
  timerMilliseconds.innerHTML = "000";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "30";
}

function updateTimer() {
  let millisPassed = Date.now() - startTime + savedTime;
  let remainingMillis = countdown - millisPassed;

  if (remainingMillis < 0) {
    remainingMillis = 0;
    clearInterval(cancelId);
    cancelId = null;
  }
  let remainingSeconds = remainingMillis / 1000;
  let remainingMinutes = remainingSeconds / 60;

  let millisHTML = remainingMillis % 1000;
  let secondsHTML = Math.floor(remainingSeconds) % 60;
  let minutesHTML = Math.floor(remainingMinutes);

  if (minutesHTML.toString().length < 2) {
    minutesHTML = minutesHTML.toString().padStart(2, "0");
  }
  if (secondsHTML.toString().length < 2) {
    secondsHTML = secondsHTML.toString().padStart(2, "0");
  }
  if (millisHTML.toString().length < 3) {
    millisHTML = millisHTML.toString().padStart(3, "0");
  }

  timerMilliseconds.innerHTML = millisHTML;
  timerSeconds.innerHTML = secondsHTML;
  timerMinutes.innerHTML = minutesHTML;

  // if (cancelId) {
  //   // cancelId = requestAnimationFrame(updateTimer);
  // }
}
