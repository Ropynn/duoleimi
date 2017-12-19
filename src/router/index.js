import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home.vue";
import member from "../components/member.vue";
import detail from "../components/detail.vue";
import payment from "../components/payment.vue";

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: home
    },
    {
      path: "/member/:price/:minutes",
      component: member
    },
    {
      path: "/detail",
      component: detail
    },
    {
      path: "/payment/:minutes/:nowTime",
      component: payment
    }
  ]
});
