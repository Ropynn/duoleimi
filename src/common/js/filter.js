import Vue from 'vue';
import moment from "moment"
Vue.filter('creatAt', function (creatTime) {
  return moment(creatTime).format('YYYY-MM-DD HH:mm:ss');
})
