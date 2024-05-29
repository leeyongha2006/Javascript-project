const result = document.getElementById('result'); // 결과를 표시할 요소 가져오기
const filter = document.getElementById('filter'); // 필터 입력란 가져오기
const listItems = []; // 사용자 목록을 저장할 배열

getData(); // 데이터 가져오기 함수 호출

filter.addEventListener('input', (e) => filterData(e.target.value)); // 필터 입력에 이벤트 리스너 추가

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50'); // 데이터 가져오기
    const { results } = await res.json(); // JSON 데이터 변환

    // 결과 요소 초기화
    result.innerHTML = "";

    // 각 사용자에 대한 정보를 가져와서 결과 요소에 추가
    results.forEach(user => {
        const li = document.createElement('li'); // 리스트 아이템 생성
        listItems.push(li); // 리스트 아이템을 배열에 추가
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;
        result.appendChild(li); // 결과 요소에 리스트 아이템 추가
    });
}

function filterData(searchTerm) {
    // 사용자 목록을 순회하면서 검색어와 일치하는지 확인하고 숨김 또는 표시
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide'); // 검색어와 일치하는 경우 숨김 클래스 제거
        } else {
            item.classList.add('hide'); // 검색어와 일치하지 않는 경우 숨김 클래스 추가
        }
    });
}
