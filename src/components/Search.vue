<template>
  <div class="container">
    <!-- enter key 눌러도 apply 함수 호출되도록! -->
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply"
    />
    <div class="selects">
      <!-- $data는 script 태그 내의 data() 객체 내의 title, type, filters 등과 같은 속성에 접근 가능한 문법이다. -->
      <!-- 이 filter.name을 동적으로 접근해야 하므로 (반복문 돌때마다 새로운 filter.name이 들어오니까), [ ] 를 이용하여 접근한다. -->
      <!-- v-model은 양방향 바인딩에 사용된다. -->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select"
      >
        <!-- filter.name이 'year' 인 경우에, value 가 빈 문자열이라면 All Years 를 그 자리에 넣겠다는 의미! -->
        <!-- data() 객체 내에서 year의 기본 값 (default)는 빈 문자열이다 => 즉 기본적으로 년도를 선택하지 않았을 때, All Years 라는 문자열이 보임! -->
        <option v-if="filter.name === 'year'" value="">All Years</option>
        <option v-for="item in filter.items" :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">Apply</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      type: "movie",
      number: 10,
      year: "",
      filters: [
        {
          name: "type",
          items: ["movie", "series", "episode"],
        },
        {
          name: "number",
          items: [10, 20, 30],
        },
        {
          name: "year",
          // items의 배열 데이터 : '즉시 실행 함수' 로 생성
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear(); // 올해 년도
            for (let i = thisYear; i >= 1985; i--) years.push(i);
            return years;
          })(),
        },
      ],
    };
  },
  methods: {
    // <컴포넌트 끼리 데이터 주고 받기>
    // 부모 자식 간의 데이터 주고 받기 : props, emits 등
    // 상위 하위 간의 데이터 주고 받기 : provide, inject 등
    // 형제 간의 데이터 주고 받기 (Search 컴포넌트에서 찾은 res 데이터를 MovieList 컴포넌트에 전달하여 display 해야 함, Search와 MovieList는 형제 관계) : Vuex(중앙 집중식 상태 관리 패턴) 라이브러리 (Store)

    async apply() {
      // store 에서 actions를 호출 : dispatch
      // store 에서 mutations를 호출 : commit
      this.$store.dispatch("movie/searchMovies", {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year,
      }); // 첫번째 인수에 movie/ 를 적은 이유 : store의 index.js 에서 movie.js의 module명을 movie 라고 했으므로
      // 첫번째 인수에 searchMovies를 적은 이유 : movie.js의 actions 내의 searchMovies 메서드 실행하려고!
      // 두번째 인수는 객체이며, searchMovies로 보낼 인수이다.

      // 이 파일에서 양방향 바인딩된 title, type, number, year 변수를 movie.js 파일의 searchMovies 메서드로 보내고,
      // searchMovies 메서드에서는 this를 사용하지 않고, 바로 변수명을 이용해서 참조해서 사용할 수 있다.
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // 모든 자식 요소들 선택자
  > * {
    margin-right: 10px;
    font-size: 15px;
    // 마지막 요소만 외부 여백 적용 X
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;

    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; // btn의 width가 120px보다 작아지지 않도록
  }
}
</style>
