import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import About from "./About";
import Movie from "./Movie";

export default createRouter({
  // Hash mode
  // https://google.com/#/search
  history: createWebHashHistory(),
  // pages
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie",
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
