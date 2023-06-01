const baseUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzIxZGZkYzJmNzNiM2ZkZmZhNTAxOTBjYzIwMmJkYyIsInN1YiI6IjY0NzZiMWQxMDA1MDhhMDEzM2VjOGUzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yL43TNG8RPAI17u68ZPnoJ4CSP5363_q6nlYXthhxFM",
  },
};

export const getData = async (page) => {
  const res = await fetch(`${baseUrl}page=${page}`, options);
  if (res.ok) {
    const json = await res.json();
    return json.results;
  }
  throw new Error("요청에 실패함");
};
