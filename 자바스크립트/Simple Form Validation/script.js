// 문자열이 비어있는지 확인하는 함수
const isBlank = function (value) {
    return (value.trim() === "" ? true : false);
}

const isBetween = function (length, min = 5, max = 25) {
    return length >= min && length <= max;
}

// 입력 값에 에러 메시지를 설정하는 함수
const setError = function (input, message) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("success");
    parentElement.classList.add("error");
    parentElement.querySelector("small").textContent = message;
}

// 입력 값을 성공 상태로 설정하는 함수
const setSuccess = function (input) {
    const parentElement = input.parentElement;
    parentElement.classList.remove("error");
    parentElement.classList.add("success");
    parentElement.querySelector("small").textContent = "";
}

// 이메일 형식을 확인하는 함수
const isValidEmail = function (email) {
    const format = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>() [\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return format.test(String(email).toLowerCase());
}

// 비밀번호가 보안 요구 사항을 충족하는지 확인하는 함수
const isPasswordSecure = function (password) {
    const format = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/);
    return format.test(String(password));
}

// 사용자 이름이 유효한 형식을 갖추고 있는지 확인하는 함수
// 단어 사이에 하나의 공백만 허용
const isValidUserName = function (username) {
    const format = new RegExp(/^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/);
    return format.test(String(username).toLowerCase());
}

// 사용자 이름을 검증하는 함수
const validateUsername = function () {
    let isInputValid = false;
    const username = username_input.value.trim();
    if (isBlank(username)) {
        setError(username_input, "Username can't be blank.");
    } else if (!isValidUserName(username)) {
        setError(username_input, "Username Invalid");
    } else if (!isBetween(username.length, 5, 25)) {
        setError(username_input, "Username must be between 5 and 25 characters.");
    } else {
        setSuccess(username_input);
        isInputValid = true;
    }
    return isInputValid;
}

// 이메일을 검증하는 함수
const validateEmail = function () {
    let isInputValid = false;
    const email = email_input.value.trim();
    if (isBlank(email)) {
        setError(email_input, "Email can't be blank.");
    } else if (!isValidEmail(email)) {
        setError(email_input, "Email is not valid.");
    } else {
        setSuccess(email_input);
        isInputValid = true;
    }
    return isInputValid;
}

// 비밀번호를 검증하는 함수
const validatePassword = function () {
    let isInputValid = false;
    const password = password_input.value.trim();

    if (isBlank(password)) {
        setError(password_input, "Password can't be blank.");
    } else if (!isPasswordSecure(password)) {
        setError(
            password_input,
            "Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)"
        );
    } else {
        setSuccess(password_input);
        isInputValid = true;
    }
    return isInputValid;
}

// 비밀번호 확인을 검증하는 함수
const validateConfirmPassword = function () {
    let isInputValid = false;
    const confirmPassword = confirm_password_input.value.trim();
    const password = password_input.value.trim();
    if (isBlank(confirmPassword)) {
        setError(confirm_password_input, "Please enter the password again");
    } else if (password !== confirmPassword) {
        setError(confirm_password_input, "Password confirmation does not match");
    } else {
        setSuccess(confirm_password_input);
        isInputValid = true;
    }
    return isInputValid;
}

// 함수 호출을 지연시키는 디바운스 함수
const debounce = function (fn, delay = 500) {
    let timeoutId;
    return function (...args) {
        // 이전 타이머를 취소
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // 새로운 타이머 설정
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    }
}

// 이벤트에 따라 적절한 검증 함수를 선택하여 실행
const selectValidatorToRun = function (event) {
    switch (event.target.id) {
        case "username_input":
            validateUsername();
            break;
        case "email_input":
            validateEmail();
            break;
        case "password_input":
            validatePassword();
            break;
        case "confirm_password_input":
            validateConfirmPassword();
            break;
    }
}

// HTML 요소들 바인딩
const signup_form = document.querySelector("#signup_form");
const username_input = document.querySelector("#username_input");
const email_input = document.querySelector("#email_input");
const password_input = document.querySelector("#password_input");
const confirm_password_input = document.querySelector("#confirm_password_input");

// 폼 제출 시 모든 검증 함수를 진행
signup_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const a = validateUsername(),
        b = validateEmail(),
        c = validatePassword(),
        d = validateConfirmPassword();

    if (a && b && c && d) {

        // 입력 완료 확인 창
        alert("All good!");

        // 페이지 리로딩
        location.reload();
    }
});

// 입력 이벤트 발생 시 디바운스된 검증 함수 실행
signup_form.addEventListener("input", debounce(selectValidatorToRun));