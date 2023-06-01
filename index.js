import { getData } from "./getData.js";

// 데이터 저장
const dataList = [];

// Dom 변수 선언
const list = document.querySelector(".movie_list");
const el = document.createElement("div");
el.className = "item_list";
list.appendChild(el);
const inputEl = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .search_btn");
const initialBtn = document.querySelector(".search .initialize_btn");

// 렌더링 함수
const render = () => {
  // 검색어가 있는 상태에서 스크롤 내릴때
  let data = [...dataList];
  if (inputEl.value) data = handleFilter(inputEl.value.trim().toLowerCase());
  // 검색어가 있으면 필터된 데이터, 없으면 그냥 데이터 렌더링

  const html = data.map(
    (item) =>
      `<div class=item onclick=(alert(${item.id})) ><img src=https://image.tmdb.org/t/p/w500${item.poster_path}
        /><h3>${item.title}</h3><div>${item.overview}</div><p>${item.vote_average}</p></div>`
  );

  el.innerHTML = html.join("");
};

// 데이터 fetch 함수
const onLoad = async (page) => {
  const items = await getData(page);
  dataList.push(...items);

  render();
};

// 스크롤 이벤트 콜백함수
const throttle = () => {
  let page = 2;
  let waiting = false;
  return () => {
    if (waiting) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    // 스크롤이 끝에 닿았을때
    if (scrollTop + clientHeight > scrollHeight - 150) {
      onLoad(page);
      waiting = true;
      page++;
      // 2초 쓰로틀링
      setTimeout(() => {
        waiting = false;
      }, 2000);
    }
  };
};
const scrollEvent = throttle();

// 검색 필터: 검색어를 입력 받고 유효한 데이터 반환
const handleFilter = (value) => dataList.filter((el) => el.title.toLowerCase().includes(value.toLowerCase()));

// 초기화
onLoad(1);
inputEl.focus();

window.addEventListener("scroll", scrollEvent);
searchBtn.addEventListener("click", () => render());
initialBtn.addEventListener("click", () => {
  inputEl.value = "";
  render();
});
inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    render();
  }
});
