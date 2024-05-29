// 요소 선택 (Element selection)
const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");

// 변수 설정 (Variable initialization)
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// 타이머 시작 함수 (Start timer function)
function startTimer() {
  // 경과된 시간 계산 (Calculate elapsed time)
  startTime = Date.now() - elapsedTime;

  // 타이머 간격 설정 (Set timer interval)
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerEl.textContent = formatTime(elapsedTime);
  }, 10);

  // 버튼 활성화/비활성화 (Enable/disable buttons)
  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;
}

// 시간 형식 함수 (Format time function)
function formatTime(elapsedTime) {
  // 밀리초, 초, 분, 시간 추출 (Extract milliseconds, seconds, minutes, hours)
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  // 시간 문자열 조합 (Combine time strings)
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}

// 타이머 정지 함수 (Stop timer function)
function stopTimer() {
  clearInterval(timerInterval);
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
}

// 타이머 리셋 함수 (Reset timer function)
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerEl.textContent = "00:00:00";
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
}

// 이벤트 리스너 설정 (Set event listeners)
startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);
