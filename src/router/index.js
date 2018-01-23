import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home.vue"; //首页组件
import member from "../components/member.vue"; //套餐组件
import detail from "../components/detail.vue"; //协议详情组件
import payment from "../components/payment.vue"; //支付组件
import mcMove from "../components/mcMove.vue"; //启动机器组件

import order from "../components/orderDetail.vue"; //订单列表组件
import finishOrder from "../components/finishOrder.vue"; //已完成订单列表组件
import unfinishedOrder from "../components/unfinishedOrder.vue"; //未完成订单列表组件

import video from "../components/video.vue";   // 视频组件
import businessman from "../components/businessman.vue";  //商家中心组件
import wallet from "../components/wallet.vue";  //钱包组件
import walletDetail from "../components/walletDetail.vue";  //提现明细组件

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
    //启动机器路由
    {
      path: "/mcMove/:price/:minutes/:orderId",
      component: mcMove
    },
    //支付完成路由
    {
      path: "/payment/:price/:minutes/:currentTime",
      component: payment
    },
    //订单路由
    {
      path: "/order",
      component: order,
      children: [{
        path: '/finishOrder',
        component: finishOrder
      },
      {
        path: '/unfinishedOrder',
        component: unfinishedOrder
      }
      ]
    },
    //视频路由
    {
      path: "/video",
      component: video
    },
    //商家中心
    {
      path: "/businessman",
      component: businessman
    },
    //我的钱包
    {
      path: "/wallet",
      component: wallet
    },
    //提现明细
    {
      path: "/walletDetail",
      component: walletDetail
    }
  ]
});
