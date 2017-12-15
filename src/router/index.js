import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/massage/home/home.vue'
import member from '../components/massage/member/member.vue'

Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass:'active',
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/member',
      component:member
    }
  ]
})
