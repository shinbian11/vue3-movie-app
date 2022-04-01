<template>
  <footer>
    <Logo />
    <a href="https://github.com/ParkYoungWoong" target="_blank">
      (c){{ new Date().getFullYear() }} HEROPY
    </a>
  </footer>
</template>

<script>
import Logo from "~/components/Logo";
export default {
  components: { Logo },
};
</script>
<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    display: block; // Logo 컴포넌트는 <RouterLink></RouterLink> 이고, 이는 <a></a> 이므로 inline 이 기본값이다.
    margin-bottom: 4px;
  }
}
</style>
