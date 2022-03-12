export default {
  // namespaced : true => module화 하겠다는 의미!
  namespaced: true,
  // state(상태)는 data와 유사한 개념!
  state: () => ({
    movies: [],
  }),
  // getters는 computed와 유사한 개념!
  getters: {
    movieIds(state) {
      return state.movies.map((m) => m.imdbID);
    },
  },
  // mutations/actions는 methods와 유사한 개념!
  // mutations 내부에서만 state(데이터)를 변경하고 수정할 수 있다! 다른 곳(getters, actions, 다른 파일 등)에서는 변경 불가
  mutations: {
    // 데이터를 '변경'시키는 기능의 함수들만 정의
    resetMovies(state) {
      state.movies = [];
    },
  },
  // actions : 비동기 함수로 처리 (async/await 안 붙여도 됨)
  actions: {
    // searchMovies({ state, getters, commit }) {
    //   이 내부에서는 mutations 내부처럼, state를 바로 접근할 수 없다.
    //   context 라는 객체를 분해!
    //   state => state 접근
    //   getters => getters 접근
    //   commit => mutations 접근
    searchMovies({ state, getters, commit }) {},
  },
};
