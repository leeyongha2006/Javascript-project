// 모든 버튼 요소 선택 (Select all button elements)
const buttonsEl = document.querySelectorAll("button");

// 결과값 표시 필드 (Input field for result)
const inputFieldEl = document.getElementById("result");

// 버튼 클릭 이벤트 리스너 설정 (Set click event listener for each button)
for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent; // 클릭한 버튼의 문자열 가져오기 (Get text content of clicked button)
    if (buttonValue === "C") {
      clearResult(); // "C" 버튼 클릭 시 결과 초기화 (Clear result on "C" button click)
    } else if (buttonValue === "=") {
      calculateResult(); // "=" 버튼 클릭 시 계산 실행 (Calculate result on "=" button click)
    } else {
      appendValue(buttonValue); // 나머지 버튼 클릭 시 값 추가 (Append value on other button clicks)
    }
  });
}

// 결과 초기화 함수 (Clear result function)
function clearResult() {
  inputFieldEl.value = ""; // 결과값 필드 내용 지우기 (Clear input field value)
}

// 계산 실행 함수 (Calculate result function)
function calculateResult() {
  try {
    inputFieldEl.value = eval(inputFieldEl.value); // 입력된 수식 계산 (Evaluate expression in input field)
  } catch (error) {
    // 계산 오류 처리 (Handle calculation errors)
    console.error("계산 오류:", error);
    inputFieldEl.value = "오류"; // 오류 메시지 표시 (Display error message)
  }
}

// 값 추가 함수 (Append value function)
function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;  // 기존 값에 새로운 값 연결 (Append new value to existing value)
}
