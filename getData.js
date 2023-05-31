const baseUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzIxZGZkYzJmNzNiM2ZkZmZhNTAxOTBjYzIwMmJkYyIsInN1YiI6IjY0NzZiMWQxMDA1MDhhMDEzM2VjOGUzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yL43TNG8RPAI17u68ZPnoJ4CSP5363_q6nlYXthhxFM",
  },
};
const cache = {
  page: 0,
  data: [],
};
export const getData = async (page) => {
  if (cache.page >= page) {
    console.log("zzzz");
    return cache.data;
  }
  const res = await fetch(`${baseUrl}page=${page}`, options);
  if (res.ok) {
    const json = await res.json();
    cache.page = page;
    cache.data.push(...json.results);
    console.log(json, "json");
    return cache.data;
  }
  throw new Error("요청에 실패함");
};
