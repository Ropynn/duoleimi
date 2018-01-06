import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home.vue";  //首页组件
import member from "../components/member.vue";  //套餐组件
import detail from "../components/detail.vue";  //协议详情组件
import payment from "../components/payment.vue";  //支付组件

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: "active",
  // mode: 'history',
  routes: [
    //重定向为首页
    {
      path: "/",
      redirect: "/home"
    },
    //首页路由
    {
      path: "/home",
      component: home
    },
    //套餐路由
    {
      path: "/member/:price/:minutes",
      component: member
    },
    //用户协议详情页路由
    {
      path: "/detail",
      component: detail
    },
    //支付完成路由
    {
      path: "/payment/:price/:minutes/:currentTime",
      // path: '/payment',
      component: payment
    }
  ]
});
