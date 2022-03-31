<template>
  <div :style="{ backgroundImage: `url(${movie.Poster})` }" class="movie">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/scss/main"; // $gray-400 와 같은 변수 사용하기 위해 필요한 import 문

.movie {
  // 포스터 그림은 img 태그보다 backgroundImage로 처리하는 게 좀 더 다루기 좋다.
  position: relative;

  $width: 168px;
  width: $width;
  height: $width * 3/2;

  margin: 10px;
  border-radius: 4px;

  background-color: $gray-400;
  background-size: cover; // background image인 포스터의 비율을 더 넓은 길이인 세로에 맞춘다.
  overflow: hidden;

  &:hover::after {
    // 영화 포스터 hover시 노란색 테두리 보이도록 (노란색 테두리를 가상 요소 after를 이용하여 표현함)
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border: 6px solid $primary; // $primary 는 노란색 계열의 색상
  }
  .info {
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;

    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba($black, 0.3);

    backdrop-filter: blur(10px); // 뒷배경 blur 처리

    .year {
      color: $primary;
    }
    .title {
      color: $white;

      // text가 영역을 넘어가면 ... 처리
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
