// Stopwatch state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

// DOM element references
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

/**
 * Format a duration in milliseconds as HH:MM:SS.mmm.
 */
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const padded = value => String(value).padStart(2, '0');
  const paddedMs = String(milliseconds).padStart(3, '0');

  return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}.${paddedMs}`;
}

/**
 * Update the visible stopwatch display.
 */
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

/**
 * Begin running the stopwatch.
 */
function startStopwatch() {
  if (timerInterval) return; // already running

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 16); // update roughly every frame for smooth rendering

  startBtn.textContent = 'Running';
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

/**
 * Pause the stopwatch and keep current time.
 */
function pauseStopwatch() {
  if (!timerInterval) return;

  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.textContent = 'Start';
  startBtn.disabled = false;
}

/**
 * Reset the stopwatch and clear laps.
 */
function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  lapCount = 0;
  lapList.innerHTML = '';
  updateDisplay();
  startBtn.textContent = 'Start';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

/**
 * Record a lap time into the lap list.
 */
function recordLap() {
  lapCount += 1;
  const lapItem = document.createElement('li');
  lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;
  lapList.prepend(lapItem);
}

/**
 * Initialize event listeners and default state.
 */
function initStopwatch() {
  startBtn.addEventListener('click', startStopwatch);
  pauseBtn.addEventListener('click', pauseStopwatch);
  resetBtn.addEventListener('click', resetStopwatch);
  lapBtn.addEventListener('click', recordLap);

  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  updateDisplay();
}

initStopwatch();
