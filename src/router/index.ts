import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Popup from "@/views/Popup.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/vue-observable-observable",
    name: "Popup",
    component: Popup
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
