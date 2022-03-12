// npm i vuex@next : vue 3 버전의 vuex 설치

// vuex의 개념은 https://v3.vuex.vuejs.org/kr/ 를 참고
// 하지만 위 링크는 vuex 의 이전 버전이므로, 개념을 이해하는 용도로만 사용하기!
// 실제 코드는 https://vuex.vuejs.org/ 를 참고!

// store 라이브러리를 모듈별로 관리 (about, movie, 등등)

import { createStore } from "vuex";
import movie from "./movie";
import about from "./about";

export default createStore({
  modules: {
    movie, // movie : movie
    about, // about : about
  },
});
