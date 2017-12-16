import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import member from '../components/member.vue';

Vue.use(VueRouter);

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
      path:'/member/:price',
      component:member
    }
  ]
})
