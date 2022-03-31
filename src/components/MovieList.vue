<template>
  <div class="container">
    <!-- movies 검색 기록이 없을 때 no-result 라는 class 명을 추가한다 -->
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <div v-if="loading" class="spinner-border text-primary"></div>
      <!-- 오류 메세지 클래스와 MovieItem 클래스는 둘 중에 하나만 보여야 하므로, v-if와 v-else문을 통해 이를 처리한다 -->
      <!-- 오류 메세지 출력 -->
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <!-- v-for="movie in movies" 에서 movies는 computed 의 movies (배열 데이터) 이다. -->
      <div v-else class="movies">
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
    loading() {
      return this.$store.state.movie.loading; // loading 이 true일때만 로딩중 이모티콘 (spinner) 가 보이게끔!
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main"; // $gray-200 등과 같은 변수 사용하기 위해 필요한 import 문

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap; // 내용이 넘치면 다음 줄로 넘기기
    justify-content: center;
  }
}
</style>
