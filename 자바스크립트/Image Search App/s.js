// API 키 (API Key)
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"; // 실제 API 키는 사용하지 마세요!

// 선택자 (Selectors)
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

// 변수 설정 (Variable initialization)
let inputData = "";
let page = 1;

// 이미지 검색 함수 (Search images function)
async function searchImages() {
  // 검색어 추출 (Extract search term)
  inputData = searchInputEl.value;

  // API 요청 URL 생성 (Create API request URL)
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // API 호출 및 데이터 가져오기 (Fetch API and get data)
  const response = await fetch(url);
  const data = await response.json();

  // 1페이지일 때 결과 초기화 (Clear results when on page 1)
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  // 검색 결과 (Search results)
  const results = data.results;

  // 검색 결과 처리 (Process search results)
  results.map((result) => {
    // 이미지 컨테이너 생성 (Create image wrapper)
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    // 이미지 요소 생성 및 설정 (Create and configure image element)
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    // 이미지 링크 생성 및 설정 (Create and configure image link)
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // 이미지 컨테이너에 이미지와 링크 추가 (Append image and link to wrapper)
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    // 검색 결과 영역에 이미지 컨테이너 추가 (Append image wrapper to search results)
    searchResultsEl.appendChild(imageWrapper);
  });

  // 페이지 증가 (Increment page number)
  page++;

  // 한 페이지 이상 검색되었을 때 '더보기' 버튼 표시 (Show 'Show More' button if more than one page is searched)
  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

// 검색 폼 submit 이벤트 리스너 (Search form submit event listener)
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// '더보기' 버튼 클릭 이벤트 리스너 ('Show More' button click event listener)
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

