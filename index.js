// import fetch from "node-fetch";s

import { getData } from "./getData.js";

const onLoad = async (page = 1) => {
  console.log("Loading");
  const list = document.querySelector(".movieList");
  const items = await getData(page);
  const el = document.createElement("div");
  list.appendChild(el);
  console.log(items);
  el.innerHTML = `
      <div class='ul'>${items.map((item) => `<div class='li'>3</div>`)}<div/>
    `;
};
onLoad();
