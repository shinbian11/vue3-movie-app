<template>
  <div class="container">
    <div class="inner">
      <!-- 오류 메세지 출력 -->
      <div class="message">
        {{ message }}
      </div>
      <!-- v-for="movie in movies" 에서 movies는 computed 의 movies (배열 데이터) 이다. -->
      <div class="movies">
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
  </div>
</template>
<script>
import MovieItem from "~/components/MovieItem";
export default {
  components: {
    MovieItem,
  },
  computed: {
    // 반응성이 유지된 데이터를 가져와야 하므로, computed에 정의한 것!
    movies() {
      return this.$store.state.movie.movies; // store의 상태(state) 부분의 movie 라는 모듈 (movie.js) 안에 있는 movies
    },
    message() {
      return this.$store.state.movie.message; // store의 상태(state) 부분의 movie 라는 모듈 (movie.js) 안에 있는 message
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main"; // $gray-200 와 같은 변수 사용하기 위해 필요한 import 문

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap; // 내용이 넘치면 다음 줄로 넘기기
    justify-content: center;
  }
}
</style>
