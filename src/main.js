import { createApp } from "vue";
import App from "./App.vue";

// 특정 폴더 내의 index.js 파일은 명시를 생략 할 수 있다.

import router from "./routes"; // 직접 만든 router 기능
import store from "./store"; // 직접 만든 store(vueX) 기능
// import router from "./routes/index.js";
// import store from "./store/index.js";

// use() : plugin 또는 라이브러리를 연결
createApp(App).use(router).use(store).mount("#app");
