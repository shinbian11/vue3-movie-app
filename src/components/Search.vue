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
import axios from "axios"; // npm i axios 필요
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
    async apply() {
      // async, await : 비동기 처리
      // Search movies 기능
      const OMDB_API_KEY = "7035c60c"; // 제공받은 키, 개인적으로 하려면 http://www.omdbapi.com/ 홈페이지의 API Key 에서 발급
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`
      );
      console.log(res);
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
