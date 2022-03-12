<template>
  <!-- 화면의 크기에 맞춰 가운데 정렬하는 기능을 부트스트랩에서 제공 => container -->
  <!-- 자세한 설명은 https://getbootstrap.com/docs/5.1/layout/containers/ -->
  <div class="container">
    <h1>
      <span>OMDb API</span><br />
      THE OPEN<br />
      MOVIE DATABASE
    </h1>

    <p>
      The OMDb API is a RESTful web service to obtain movie information, all
      content and images on the site are contributed and maintained by our
      users. If you find this service useful, please consider making a one-time
      donation or become a patron.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  font-size: 80px;
  span {
    color: $primary;
  }
}

p {
  margin: 30px 0;
  color: $gray-600;
}
</style>
