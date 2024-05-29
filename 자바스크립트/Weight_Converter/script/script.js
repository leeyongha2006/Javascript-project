// HTML 요소를 참조
let kgRef = document.getElementById("kg");
let lbRef = document.getElementById("lb");
let ozRef = document.getElementById("oz");

// 킬로그램을 변환하는 함수
let convertFromKg = () => {
    let kg = kgRef.value;
    // 소수점 둘째 자리까지 제한
    lbRef.value = (kg * 2.205).toFixed(2);
    ozRef.value = (kg * 35.274).toFixed(2);
}

// 파운드를 변환하는 함수
let convertFromLg = () => {
    let lb = lbRef.value;
    kgRef.value = (lb / 2.205).toFixed(2);
    ozRef.value = (lb * 16).toFixed(2);
}

// 온스를 변환하는 함수
let convertFromOz = () => {
    let oz = ozRef.value;
    kgRef.value = (oz / 35.274).toFixed(2);
    lbRef.value = (oz * 16).toFixed(2);
}

// 입력 이벤트 리스너 추가
kgRef.addEventListener("input", convertFromKg);
lbRef.addEventListener("input", convertFromLg);
ozRef.addEventListener("input", convertFromOz);

// 페이지가 로드될 때 킬로그램 변환 함수 호출
window.addEventListener("load", convertFromKg);