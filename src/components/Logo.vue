<template>
  <RouterLink to="/" class="logo"> <span>OMDbAPI</span>.COM </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black; // main.scss 에 있는 @import "../../node_modules/bootstrap/scss/variables"; 파일 내에 $black 변수가 정의되어 있음.
  text-decoration: none; // 밑줄 사용 안함
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>
