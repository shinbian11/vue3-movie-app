<template>
  <Header />
  <RouterView />
  <Footer />
</template>
<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer"; // main 페이지 뿐만 아니라 Movie, About 페이지에서도 보여야하니까, App.vue에다가 정의하였다
export default {
  components: { Header, Footer },
};
</script>
<style lang="scss">
@import "~/scss/main";
</style>
