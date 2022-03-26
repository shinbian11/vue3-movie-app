import axios from "axios"; // npm i axios 필요
import _uniqBy from "lodash/uniqBy"; // https://lodash.com/docs/4.17.15#uniqBy (영화 검색 데이터 중복 처리)

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: "",
    loading: false,
  }),
  getters: {},
  mutations: {
    // state의 데이터를 변경하는 건 mutations에서만 가능!!
    // state의 데이터가 너무 많으면, 일일히 갱신하는데 어려움!
    // 그래서 updateState 와 같은 메서드가 필요!
    // updateState 메서드 : 통합적으로 state의 속성들을 갱신하는 메서드
    // 새로운 데이터가 객체 형태로 뭉쳐서 payload 라는 변수로 들어오게 되고, 그 새로운 값은 기존의 값을 변경한다.
    updateState(state, payload) {
      // Object.keys는 속성들의 이름을 가지고 배열을 만들어서 반환 => 즉, ['movies', 'message', 'loading' ] 반환!
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      // payload : 받아오는 데이터
      const { title, type, number, year } = payload;
      // async, await : 비동기 처리
      // Search movies 기능
      const OMDB_API_KEY = "7035c60c"; // 제공받은 키, 개인적으로 하려면 http://www.omdbapi.com/ 홈페이지의 API Key 에서 발급
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );

      const { Search, totalResults } = res.data;
      commit("updateState", {
        movies: _uniqBy(Search, "imdbID"), // imdbID를 기준으로 중복을 제거한 데이터만 movies에 저장된다. (imdbID가 동일한 데이터들이 중복되어 검색되는 경우가 있으므로!)
      }); // 두 번째 객체 데이터가 updateState 메서드의 payload로 들어간다.

      const total = parseInt(totalResults, 10);
      const pageLength = Math.ceil(total / 10); // 총 268개의 데이터가 검색되었다면, 1 page에 10개라면 총 27 page 이다

      // 추가 요청!
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > number / 10) break;
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
          );
          const { Search } = res.data;
          commit("updateState", {
            movies: [
              ...state.movies, // 전개 연산자 사용
              ..._uniqBy(Search, "imdbID"), // imdbID를 기준으로 중복을 제거한 데이터만 movies에 저장된다. (imdbID가 동일한 데이터들이 중복되어 검색되는 경우가 있으므로!)
            ], // 기존의 movies 데이터에 들어가 있는 데이터(state.movies)에다가 이번에 추가된 데이터(_uniqBy(Search, "imdbID"))를 삽입
          });
        }
      }
    },
  },
};
